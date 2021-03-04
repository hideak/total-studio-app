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
          label="Preço Padrão"
          :src="require('@/assets/img/dollar-sign-solid.svg')"
        />
        <InputField
          placeholder="Digite o preço do serviço..."
          inputMode="numeric"
          v-model="defaultPrice"
        />
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
          label="Salvar Serviço"
          @click="saveAction"
        />
        <Button v-if="!isEditing" label="Cancelar" @click="cancelAction" />
        <Button
          v-if="isEditing"
          isAlternativeColor
          label="Salvar Serviço"
          @click="editAction"
        />
        <Button
          v-if="isEditing"
          label="Excluir Serviço"
          @click="deleteAction"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, ref } from 'vue';
import { useRoute } from 'vue-router';
import TitleBar from '@/components/TitleBar.vue';
import InputField from '@/components/InputField.vue';
import Label from '@/components/Label.vue';
import Button from '@/components/Button.vue';
import ServiceCreate from '@/model/dto/service-create';
import GenericService from '@/services/shared/generic-service';
import DatabaseConnection from '@/model/interface/database-connection.interface';
import Service from '@/model/service.model';
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
    const defaultPrice = ref('');
    const details = ref('');
    const route = useRoute();

    // initializing database
    const db: DatabaseConnection = inject('dbConnection') as DatabaseConnection;
    const serviceService = new GenericService<Service, ServiceCreate>(
      db,
      'services'
    );

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
     * Gets the current service id from the router parameters
     * @returns the id of the current service
     */
    const getServiceId = (): number => {
      return parseInt(route.params.id as string, 10);
    };

    /**
     * Parses the price and return it as a number, or null if it is unparsable
     * @return the price as a string, or null if it is unparsable
     */
    const parseDefaultPrice = (defaultPrice: string): number | null => {
      const pattern = /\d*[.|,]\d+/;
      const result = pattern.exec(defaultPrice);
      if (result) {
        return parseFloat(result[0].replace(',', '.'));
      } else {
        return null;
      }
    };

    /**
     * Parses the service data and returns a service creation DTO
     * @returns a new service DTO the parsed data
     */
    const parseCreateData = (): ServiceCreate => {
      const serviceName = name.value;
      const serviceDefaultPrice = parseDefaultPrice(defaultPrice.value);
      const serviceDetails = details.value;

      return new ServiceCreate(
        serviceName,
        serviceDefaultPrice,
        serviceDetails
      );
    };

    /**
     * Parses the service data and returns a service object
     * @returns a new service object with the parsed data
     */
    const parseUpdateData = (): Service => {
      const serviceName = name.value;
      const serviceDefaultPrice = parseDefaultPrice(defaultPrice.value);
      const serviceDetails = details.value;

      return new Service(
        getServiceId(),
        serviceName,
        serviceDefaultPrice,
        serviceDetails
      );
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
      const newService = parseCreateData();

      // create data
      serviceService.create(newService).then(() => {
        // return to service list
        router.go(-1);
      });
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
      const editedService = parseUpdateData();

      // update data
      serviceService.update(editedService).then(() => {
        // return to service list
        router.go(-1);
      });
    };

    /**
     * Handles the delete button click and returns to the service list
     */
    const deleteAction = (): void => {
      // parse data
      const serviceId = getServiceId();

      // delete data
      serviceService.delete(serviceId).then(() => {
        // return to service list
        router.go(-1);
      });
    };

    // loading information on edit
    if (props.isEditing) {
      // getting the service being edited
      const serviceId = getServiceId();
      serviceService.get(serviceId).then((service: Service) => {
        // updating fields
        name.value = service.name;
        defaultPrice.value = service.defaultPrice
          ? `R$ ${service.defaultPrice.toFixed(2).replace('.', ',')}`
          : '';
        details.value = service.details;
      });
    }

    // expose template variables
    return {
      name,
      defaultPrice,
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
