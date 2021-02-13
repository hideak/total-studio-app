<template>
  <teleport to="#modal">
    <div class="list-selector" :class="{ visible: isOpened }">
      <div class="container">
        <div class="title">Selecione um item da lista</div>
        <div class="content">
          <ListItem
            v-for="item in items"
            :key="item.id"
            :content="item.name"
            @click="itemAction(item.id)"
          />
        </div>
        <div class="buttons">
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
import Button from '@/components/Button.vue';

export default defineComponent({
  name: 'ListSelector',
  components: {
    ListItem,
    Button
  },
  props: {
    items: { type: Object as PropType<SortableListItem[]>, default: [] }
  },
  emits: ['selected'],
  setup(props, context) {
    const isOpened = ref(false);

    /**
     * Opens the list selector
     */
    const open = (): void => {
      isOpened.value = true;
    };

    /**
     * Closes the list selector
     */
    const close = (): void => {
      isOpened.value = false;
    };

    /**
     * Emits an event containing the selected item id
     * @param id the id of the clicked item
     */
    const itemAction = (id: number): void => {
      context.emit('selected', id);
      close();
    };

    // exposed template variables
    return { isOpened, open, close, itemAction };
  }
});
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

div.list-selector {
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
    height: 70%;
    padding: 1rem;
    border-radius: 0.25rem;

    div.content {
      margin: 1rem 0;
      flex-grow: 1;
      overflow-y: scroll;
    }
  }

  &.visible {
    visibility: visible;
    opacity: 1;
  }
}
</style>
