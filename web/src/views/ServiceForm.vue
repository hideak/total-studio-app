<template>
  <div class="service-form">
    <TitleBar
      title="Meus Serviços"
      :icon="require('@/assets/img/cut-solid.svg')"
    />
    <div class="content">
      <div class="header">
        {{ header }}
      </div>
      <div class="input-group">
        <Label
          label="Nome do serviço"
          :src="require('@/assets/img/cut-solid.svg')"
        />
        <InputField placeholder="Digite o nome do serviço..." v-model="name" />
      </div>
      <div class="input-group">
        <Label
          label="Outras Informações"
          :src="require('@/assets/img/info-circle-solid.svg')"
        />
        <InputField
          placeholder="Digite outras informações do serviço..."
          v-model="details"
        />
      </div>
      <div class="buttons">
        <Button
          v-if="!isEditing"
          isAlternativeColor
          label="Salvar serviço"
          @click="saveAction"
        />
        <Button v-if="!isEditing" label="Cancelar" @click="cancelAction" />
        <Button
          v-if="isEditing"
          isAlternativeColor
          label="Salvar serviço"
          @click="editAction"
        />
        <Button
          v-if="isEditing"
          label="Excluir serviço"
          @click="deleteAction"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import TitleBar from '@/components/TitleBar.vue';
import InputField from '@/components/InputField.vue';
import Label from '@/components/Label.vue';
import Button from '@/components/Button.vue';
import Service from '@/model/service.model.ts';
import ServiceMockService from '@/services/service-mock-service.ts';
import router from '@/router';

export default defineComponent({
  name: 'ServiceForm',
  components: {
    TitleBar,
    InputField,
    Label,
    Button
  },
  props: {
    isEditing: { type: Boolean, default: false }
  },
  setup(props) {
    const name = ref('');
    const details = ref('');
    const serviceService = new ServiceMockService();
    const route = useRoute();

    /**
     * Returns a computed property depending on the edit mode
     */
    const header = computed(() => {
      return props.isEditing ? 'Editar serviço' : 'Cadastrar novo serviço';
    });

    /**
     * Validates the input data before persisting
     */
    const validateData = (): boolean => {
      if (!name.value) {
        window.alert('Digite um nome válido para o serviço.');
        return false;
      }
      return true;
    };

    /**
     * Parses the service data and returns a service object
     * @param id the id of the service being parsed
     * @returns a new service with the parsed data
     */
    const parseData = (id: number): Service => {
      const serviceName = name.value;
      const serviceDetails = details.value;

      return new Service(id, serviceName, serviceDetails);
    };

    /**
     * Gets the current service id from the router parameters
     * @returns the id of the current service
     */
    const getServiceId = (): number => {
      return parseInt(route.params.id as string, 10);
    };

    /**
     * Handles the cancel button click and returns to the service list
     */
    const cancelAction = (): void => {
      router.go(-1);
    };

    /**
     * Handles the save button click and returns to the service list
     */
    const saveAction = (): void => {
      // validate data
      if (!name.value) {
        window.alert('Digite um nome válido para o serviço.');
        return;
      }

      // parse data
      const newService = parseData(0);

      // create data
      serviceService.create(newService);

      // return to service list
      router.go(-1);
    };

    /**
     * Handles the edit button click and returns to the service list
     */
    const editAction = (): void => {
      // validate data
      if (!validateData()) {
        return;
      }

      // parse data
      const serviceId = getServiceId();
      const editedService = parseData(serviceId);

      // update data
      serviceService.update(editedService);

      // return to service list
      router.go(-1);
    };

    /**
     * Handles the delete button click and returns to the service list
     */
    const deleteAction = (): void => {
      // parse data
      const serviceId = getServiceId();

      // delete data
      serviceService.delete(serviceId);

      // return to service list
      router.go(-1);
    };

    // loading information on edit
    if (props.isEditing) {
      // getting the service being edited
      const serviceId = getServiceId();
      const service = serviceService.get(serviceId);

      // updating fields
      name.value = service.name;
      details.value = service.details;
    }

    // expose template variables
    return {
      name,
      details,
      header,
      cancelAction,
      saveAction,
      editAction,
      deleteAction
    };
  }
});
</script>

<style lang="scss" scoped>
div.service-form {
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
