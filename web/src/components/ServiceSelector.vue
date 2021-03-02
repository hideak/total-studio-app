<template>
  <teleport to="#modal">
    <div class="service-selector" :class="{ visible: isOpened }">
      <div class="container">
        <div class="title">Selecione ou digite um serviço</div>
        <div class="content">
          <ListItem
            v-for="item in items"
            :key="item.id"
            :content="item.name"
            @click="itemAction(item.name)"
          />
        </div>
        <div class="footer">
          <div class="service-inputs">
            <InputField
              textAlignCenter
              placeholder="Nome do serviço"
              v-model="service"
            />
            <InputField
              textAlignCenter
              placeholder="Valor do serviço"
              type="number"
              v-model="price"
            />
          </div>
          <Button isAlternativeColor label="Confirmar" @click="confirm" />
          <Button label="Cancelar" @click="close" />
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import SortableListItem from '@/model/interface/sortable-list-item.interface';
import ListItem from '@/components/ListItem.vue';
import InputField from '@/components/InputField.vue';
import Button from '@/components/Button.vue';
import ServiceEntry from '@/model/service-entry.model';

export default defineComponent({
  name: 'ServiceSelector',
  components: {
    ListItem,
    InputField,
    Button
  },
  props: {
    items: { type: Object as PropType<SortableListItem[]>, default: [] }
  },
  emits: ['selected'],
  setup(props, context) {
    const newItemIndex = ref(0);
    const service = ref('');
    const price = ref('');
    const isOpened = ref(false);

    /**
     * Validates the input data before completing the request
     */
    const validateData = (): boolean => {
      if (!service.value) {
        window.alert('Selecione ou digite um nome para o serviço prestado.');
        return false;
      } else if (!price.value) {
        window.alert('Adicione um preço para o serviço prestado.');
        return false;
      } else if (isNaN(parseFloat(price.value.replace(',', '.')))) {
        window.alert('O valor digitado para o preço não é válido.');
        return false;
      }
      return true;
    };

    /**
     * Opens the list selector
     */
    const open = (newIndex: number): void => {
      service.value = '';
      price.value = '';
      newItemIndex.value = newIndex;
      isOpened.value = true;
    };

    /**
     * Closes the list selector
     */
    const close = (): void => {
      isOpened.value = false;
    };

    /**
     * Confirm the specification of the service
     */
    const confirm = (): void => {
      // validate data
      if (!validateData()) {
        return;
      }

      // create a new service entry
      const serviceEntry = new ServiceEntry(
        newItemIndex.value,
        service.value,
        parseFloat(price.value.replace(',', '.'))
      );

      // emit the service entry
      context.emit('selected', serviceEntry);
      close();
    };

    /**
     * Emits an event containing the selected item id
     * @param id the id of the clicked item
     */
    const itemAction = (name: string): void => {
      service.value = name;
    };

    // exposed template variables
    return { service, price, isOpened, open, close, confirm, itemAction };
  }
});
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

div.service-selector {
  visibility: hidden;
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: $app-background-color-modal;
  transition: opacity 0.1s ease-in, visibility 0.1s;

  div.container {
    display: flex;
    flex-direction: column;
    background-color: $app-background-color-white;
    width: 80%;
    height: 90%;
    padding: 1rem;
    border-radius: 0.25rem;

    div.title {
      text-align: center;
    }

    div.content {
      margin: 1rem 0;
      flex-grow: 1;
      overflow-y: scroll;
    }

    div.footer {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      div.service-inputs {
        display: flex;
        flex-direction: column;
        margin: 0 0.125rem;
      }
    }
  }

  &.visible {
    visibility: visible;
    opacity: 1;
  }
}
</style>
