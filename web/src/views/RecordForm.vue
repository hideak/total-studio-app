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
          placeholder="Adicionar Serviço"
          disabled
          hasIcon
          :icon="require('@/assets/img/plus-circle-solid.svg')"
          @click="handleServiceEntryOpen"
        />
        <ListItem
          v-for="serviceEntry in serviceEntries"
          :key="serviceEntry.id"
          :content="serviceEntry.name"
          :sideContent="`R$ ${serviceEntry.price.toFixed(2).replace('.', ',')}`"
          :deleteAction="() => handleServiceEntryDelete(serviceEntry.id)"
          hasDeleteIcon
        />
        <ListItem content="Total (R$)" :sideContent="total" />
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
        <InputField
          placeholder="Digite um horário..."
          v-model="time"
          inputMode="numeric"
          maxLength="5"
          @update:modelValue="maskTimeField()"
        />
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
        <Button
          v-if="!isEditing"
          isAlternativeColor
          label="Salvar Registro"
          @click="saveAction"
        />
        <Button v-if="!isEditing" label="Cancelar" @click="cancelAction" />
        <Button
          v-if="isEditing"
          isAlternativeColor
          label="Salvar Registro"
          @click="editAction"
        />
        <Button
          v-if="isEditing"
          label="Excluir Registro"
          @click="deleteAction"
        />
      </div>
    </div>
    <ServiceSelector
      ref="serviceSelector"
      :items="services"
      @selected="handleServiceSelection"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, Ref, ref } from 'vue';
import { useRoute } from 'vue-router';
import { stringToDate, dateToString, timeToString } from '@/util/date-utils';
import TitleBar from '@/components/TitleBar.vue';
import InputField from '@/components/InputField.vue';
import Label from '@/components/Label.vue';
import Button from '@/components/Button.vue';
import ServiceSelector from '@/components/ServiceSelector.vue';
import ListItem from '@/components/ListItem.vue';
import Record from '@/model/record.model';
import RecordCreate from '@/model/dto/record-create';
import Service from '@/model/service.model';
import ServiceCreate from '@/model/dto/service-create';
import RecordService from '@/services/record-service';
import Client from '@/model/client.model';
import ClientCreate from '@/model/dto/client-create';
import DatabaseConnection from '@/model/interface/database-connection.interface';
import GenericService from '@/services/shared/generic-service';
import ServiceEntry from '@/model/service-entry.model';
import router from '@/router';

export default defineComponent({
  name: 'RecordForm',
  components: {
    TitleBar,
    InputField,
    Label,
    Button,
    ServiceSelector,
    ListItem
  },
  props: {
    isEditing: { type: Boolean, default: false }
  },
  setup(props) {
    const serviceSelector = ref();
    const services = ref();
    const name = ref('');
    const serviceEntries: Ref<ServiceEntry[]> = ref([]);
    const date = ref('');
    const time = ref('');
    const details = ref('');
    const route = useRoute();

    // initializing database
    const db: DatabaseConnection = inject('dbConnection') as DatabaseConnection;
    const recordService = new RecordService(db, 'records');
    const clientService = new GenericService<Client, ClientCreate>(
      db,
      'clients'
    );
    const serviceService = new GenericService<Service, ServiceCreate>(
      db,
      'services'
    );

    /**
     * Returns a computed property depending on the edit mode
     */
    const header = computed(() => {
      return props.isEditing
        ? 'Editar registro de serviço'
        : 'Novo registro de serviço';
    });

    /**
     * Returns the computed total price of all the service entries
     */
    const total = computed(() => {
      const result = serviceEntries.value
        .map((serviceEntry: ServiceEntry) => serviceEntry.price)
        .reduce((previous, current) => previous + current, 0);
      return `R$ ${result.toFixed(2).replace('.', ',')}`;
    });

    /**
     * Validates the input data before persisting
     */
    const validateData = (): boolean => {
      if (serviceEntries.value.length === 0) {
        window.alert('Adicione pelo menos um serviço válido para o cliente.');
        return false;
      }
      return true;
    };

    /**
     * Gets the current client id from the router parameters
     * @returns the id of the current client
     */
    const getClientId = (): number => {
      return parseInt(route.params.clientId as string, 10);
    };

    /**
     * Gets the current record id from the router parameters
     * @returns the id of the current record
     */
    const getRecordId = (): number => {
      return parseInt(route.params.recordId as string, 10);
    };

    /**
     * Parses the record data and returns a record creation DTO
     * @returns a new record DTO the parsed data
     */
    const parseCreateData = (): RecordCreate => {
      const recordServices = JSON.parse(
        JSON.stringify(serviceEntries.value)
      ) as ServiceEntry[];
      const recordDate = stringToDate(date.value);
      const recordTime = time.value;
      const recordDetails = details.value;

      return new RecordCreate(
        getClientId(),
        recordServices,
        recordDate,
        recordTime,
        recordDetails
      );
    };

    /**
     * Parses the record data and returns a record object
     * @returns a new record with the parsed data
     */
    const parseUpdateData = (): Record => {
      const recordServices = JSON.parse(
        JSON.stringify(serviceEntries.value)
      ) as ServiceEntry[];
      const recordDate = stringToDate(date.value);
      const recordTime = time.value;
      const recordDetails = details.value;

      return new Record(
        getRecordId(),
        getClientId(),
        recordServices,
        recordDate,
        recordTime,
        recordDetails
      );
    };

    /**
     * Gets the value of the id of a possible new service entry to be added
     * @returns the desired id to be attached to a new service entry
     */
    const getNewServiceId = (): number => {
      const maxValue = Math.max(
        ...serviceEntries.value.map(
          (serviceEntry: ServiceEntry) => serviceEntry.id
        )
      );
      return maxValue === Math.max() ? 1 : maxValue + 1;
    };

    /**
     * Handles the open operation of the service selector
     */
    const handleServiceEntryOpen = (): void => {
      serviceSelector.value.open(getNewServiceId());
    };

    /**
     * Handles the selected service
     * @param id the id of the selected service
     */
    const handleServiceSelection = (serviceEntry: ServiceEntry): void => {
      serviceEntries.value.push(serviceEntry);
    };

    /**
     * Handles the deletion of a service entry
     * @param id the id of the service entry to delete
     */
    const handleServiceEntryDelete = (id: number) => {
      const index = serviceEntries.value.findIndex(
        (serviceEntry: ServiceEntry) => {
          return serviceEntry.id === id;
        }
      );
      serviceEntries.value.splice(index, 1);
    };

    /**
     * Handles the cancel button click and returns to the records list
     */
    const cancelAction = (): void => {
      router.go(-1);
    };

    /**
     * Handles the save button click and returns to the records list
     */
    const saveAction = (): void => {
      // validate data
      if (!validateData()) {
        return;
      }

      // parse data
      const newRecord = parseCreateData();

      // create data
      recordService.create(newRecord).then(() => {
        // return to records list
        router.go(-1);
      });
    };

    /**
     * Handles the edit button click and returns to the records list
     */
    const editAction = (): void => {
      // validate data
      if (!validateData()) {
        return;
      }

      // parse data
      const editedRecord = parseUpdateData();

      // update data
      recordService.update(editedRecord).then(() => {
        // return to records list
        router.go(-1);
      });
    };

    /**
     * Handles the delete button click and returns to the records list
     */
    const deleteAction = (): void => {
      // parse data
      const recordId = getRecordId();

      // delete data
      recordService.delete(recordId).then(() => {
        // return to records list
        router.go(-1);
      });
    };

    /**
     * Masks the time field as the user edits its value
     */
    const maskTimeField = (): void => {
      if (time.value.length < 2) {
        return;
      } else if (!time.value.includes(':')) {
        time.value = time.value + ':';
      }
    };

    // load services
    serviceService.getAll().then((entities: Service[]) => {
      services.value = entities;
    });

    // load current client
    const clientId = getClientId();
    clientService.get(clientId).then((entity: Client) => {
      name.value = entity.name;
    });

    // loading information on creation
    if (!props.isEditing) {
      // set default value for date and time
      const now = new Date();
      date.value = dateToString(now);
      time.value = timeToString(now);
    }

    // loading information on edit
    else {
      // getting the client being edited
      const recordId = getRecordId();
      recordService.get(recordId).then((record: Record) => {
        // updating fields
        serviceEntries.value = record.services;
        date.value = dateToString(record.date);
        time.value = record.time;
        details.value = record.details;
      });
    }

    // expose template variables
    return {
      header,
      name,
      serviceEntries,
      date,
      time,
      details,
      serviceSelector,
      services,
      total,
      handleServiceEntryOpen,
      handleServiceSelection,
      handleServiceEntryDelete,
      cancelAction,
      saveAction,
      editAction,
      deleteAction,
      maskTimeField
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
