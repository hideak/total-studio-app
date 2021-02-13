<template>
  <div class="record-form">
    <TitleBar
      title="Meus Clientes"
      :icon="require('@/assets/img/user-friends-solid.svg')"
    />
    <div class="content">
      <div class="header">
        {{ header }}
      </div>
      <div class="input-group">
        <Label
          label="Cliente"
          :src="require('@/assets/img/user-friends-solid.svg')"
        />
        <Label hideIcon noPadding :label="name" />
      </div>
      <div class="input-group">
        <Label label="Serviço" :src="require('@/assets/img/cut-solid.svg')" />
        <InputField
          placeholder="Selecione um serviço..."
          v-model="service"
          disabled
          hasIcon
          :icon="require('@/assets/img/chevron-down-solid.svg')"
          @click="serviceSelector.open()"
        />
      </div>
      <div class="input-group">
        <Label
          label="Data"
          :src="require('@/assets/img/calendar-day-solid.svg')"
        />
        <InputField
          placeholder="Selecione uma data..."
          type="date"
          v-model="date"
        />
      </div>
      <div class="input-group">
        <Label label="Horário" :src="require('@/assets/img/clock-solid.svg')" />
        <InputField type="number" v-model="time" />
      </div>
      <div class="input-group">
        <Label
          label="Detalhes do serviço"
          :src="require('@/assets/img/info-circle-solid.svg')"
        />
        <InputField
          placeholder="Digite outras informações do registro..."
          v-model="details"
        />
      </div>
      <div class="buttons">
        <Button isAlternativeColor label="Salvar registro" />
        <Button label="Cancelar" @click="cancelAction" />
      </div>
    </div>
    <ListSelector
      ref="serviceSelector"
      :items="services"
      @selected="handleServiceSelection"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue';
import { useRoute } from 'vue-router';
import TitleBar from '@/components/TitleBar.vue';
import InputField from '@/components/InputField.vue';
import Label from '@/components/Label.vue';
import Button from '@/components/Button.vue';
import ListSelector from '@/components/ListSelector.vue';
import ClientMockService from '@/services/client-mock-service.ts';
import ServiceMockService from '@/services/service-mock-service.ts';
import router from '@/router';

export default defineComponent({
  name: 'RecordForm',
  components: {
    TitleBar,
    InputField,
    Label,
    Button,
    ListSelector
  },
  props: {
    isEditing: { type: Boolean, default: false }
  },
  setup(props) {
    const serviceSelector = ref(null);
    const serviceId: Ref<number | null> = ref(null);
    const name = ref('');
    const service = ref('');
    const date = ref('');
    const time = ref('');
    const details = ref('');
    const route = useRoute();
    const clientService = new ClientMockService();
    const serviceService = new ServiceMockService();

    /**
     * Returns a computed property depending on the edit mode
     */
    const header = computed(() => {
      return props.isEditing
        ? 'Editar registro de serviço'
        : 'Novo registro de serviço';
    });

    /**
     * Gets the current client id from the router parameters
     * @returns the id of the current client
     */
    const getClientId = (): number => {
      return parseInt(route.params.id as string, 10);
    };

    /**
     * Handles the selected service
     * @param id the id of the selected service
     */
    const handleServiceSelection = (id: number) => {
      serviceId.value = id;
      service.value = serviceService.get(serviceId.value).name;
    };

    /**
     * Handles the cancel button click and returns to the client list
     */
    const cancelAction = (): void => {
      router.go(-1);
    };

    // load services
    const services = serviceService.getAll();
    const clientId = getClientId();
    name.value = clientService.get(clientId).name;

    // expose template variables
    return {
      header,
      name,
      service,
      date,
      time,
      details,
      serviceSelector,
      services,
      handleServiceSelection,
      cancelAction
    };
  }
});
</script>

<style lang="scss" scoped>
div.record-form {
  display: flex;
  flex-direction: column;
  height: 100%;
}

div.content {
  overflow-y: scroll;

  div.header {
    font-size: 1.125rem;
    padding: 0 1rem 1rem 1rem;
  }

  div.input-group {
    margin-bottom: 1rem;
  }
}

div.buttons {
  display: flex;
  padding: 1rem;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
