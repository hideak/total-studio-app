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
import { stringToDate, dateToString, timeToString } from '@/util/date-utils';
import TitleBar from '@/components/TitleBar.vue';
import InputField from '@/components/InputField.vue';
import Label from '@/components/Label.vue';
import Button from '@/components/Button.vue';
import ListSelector from '@/components/ListSelector.vue';
import ClientMockService from '@/services/client-mock-service.ts';
import ServiceMockService from '@/services/service-mock-service.ts';
import Record from '@/model/record.model.ts';
import RecordMockService from '@/services/record-mock-service.ts';
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
    const recordService = new RecordMockService();

    /**
     * Returns a computed property depending on the edit mode
     */
    const header = computed(() => {
      return props.isEditing
        ? 'Editar registro de serviço'
        : 'Novo registro de serviço';
    });

    /**
     * Validates the input data before persisting
     */
    const validateData = (): boolean => {
      if (!service.value) {
        window.alert('Escolha um serviço válido para o cliente.');
        return false;
      }
      return true;
    };

    /**
     * Parses the record data and returns a record object
     * @param id the id of the record being parsed
     * @returns a new record with the parsed data
     */
    const parseData = (id: number, clientId: number): Record => {
      const recordService = service.value;
      const recordDate = stringToDate(date.value);
      const recordTime = time.value;
      const recordDetails = details.value;

      return new Record(
        id,
        clientId,
        recordService,
        recordDate,
        recordTime,
        recordDetails
      );
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
     * Handles the selected service
     * @param id the id of the selected service
     */
    const handleServiceSelection = (id: number) => {
      serviceId.value = id;
      service.value = serviceService.get(serviceId.value).name;
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
      const clientId = getClientId();
      const newRecord = parseData(0, clientId);

      // create data
      recordService.create(newRecord);

      // return to records list
      router.go(-1);
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
      const clientId = getClientId();
      const recordId = getRecordId();
      const editedRecord = parseData(recordId, clientId);

      // update data
      recordService.update(editedRecord);

      // return to records list
      router.go(-1);
    };

    /**
     * Handles the delete button click and returns to the records list
     */
    const deleteAction = (): void => {
      // parse data
      const recordId = getRecordId();

      // delete data
      recordService.delete(recordId);

      // return to records list
      router.go(-1);
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
    const services = serviceService.getAll();

    // load current client
    const clientId = getClientId();
    name.value = clientService.get(clientId).name;

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
      const record = recordService.get(recordId);

      // updating fields
      service.value = record.service;
      date.value = dateToString(record.date);
      time.value = record.time;
      details.value = record.details;
    }

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
