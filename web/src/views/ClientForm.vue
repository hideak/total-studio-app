<template>
  <div class="client-form">
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
          label="Nome"
          :src="require('@/assets/img/user-friends-solid.svg')"
        />
        <InputField placeholder="Digite o nome do cliente..." v-model="name" />
      </div>
      <div class="input-group">
        <Label label="Contato" :src="require('@/assets/img/phone-solid.svg')" />
        <InputField
          placeholder="Digite o contato do cliente..."
          v-model="phone"
          type="tel"
        />
      </div>
      <div class="input-group">
        <Label
          label="Aniversário"
          :src="require('@/assets/img/birthday-cake-solid.svg')"
        />
        <InputField
          placeholder="Selecione o aniversário do cliente..."
          v-model="birthday"
          type="date"
        />
      </div>
      <div class="input-group">
        <Label
          label="Outras Informações"
          :src="require('@/assets/img/info-circle-solid.svg')"
        />
        <InputField
          placeholder="Digite outras informações do cliente..."
          v-model="additionalInfo"
        />
      </div>
      <div class="buttons">
        <Button
          v-if="!isEditing"
          isAlternativeColor
          label="Salvar Cliente"
          @click="saveAction"
        />
        <Button v-if="!isEditing" label="Cancelar" @click="cancelAction" />
        <Button
          v-if="isEditing"
          isAlternativeColor
          label="Salvar Cliente"
          @click="editAction"
        />
        <Button
          v-if="isEditing"
          label="Excluir Cliente"
          @click="deleteAction"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import { stringToDate, dateToString } from '@/util/date-utils.ts';
import TitleBar from '@/components/TitleBar.vue';
import InputField from '@/components/InputField.vue';
import Label from '@/components/Label.vue';
import Button from '@/components/Button.vue';
import Client from '@/model/client.model.ts';
import ClientCreate from '@/model/dto/client-create';
import ClientMockService from '@/services/client-mock-service.ts';
import router from '@/router';

export default defineComponent({
  name: 'ClientForm',
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
    const phone = ref('');
    const birthday = ref('');
    const additionalInfo = ref('');
    const route = useRoute();
    const clientService = new ClientMockService();

    /**
     * Returns a computed property depending on the edit mode
     */
    const header = computed(() => {
      return props.isEditing ? 'Editar cliente' : 'Cadastrar novo cliente';
    });

    /**
     * Validates the input data before persisting
     */
    const validateData = (): boolean => {
      if (!name.value) {
        window.alert('Digite um nome válido para o cliente.');
        return false;
      }
      return true;
    };

    /**
     * Gets the current client id from the router parameters
     * @returns the id of the current client
     */
    const getClientId = (): number => {
      return parseInt(route.params.id as string, 10);
    };

    /**
     * Parses the client data and returns a client creation DTO
     * @returns a new client DTO with the parsed data
     */
    const parseCreateData = (): ClientCreate => {
      const clientName = name.value;
      const clientPhone = phone.value;
      const clientBirthday = stringToDate(birthday.value);
      const clientAdditionalInfo = additionalInfo.value;

      return new ClientCreate(
        clientName,
        clientPhone,
        clientBirthday,
        clientAdditionalInfo
      );
    };

    /**
     * Parses the client data and returns a client object
     * @returns a new client object with the parsed data
     */
    const parseUpdateData = (): Client => {
      const clientName = name.value;
      const clientPhone = phone.value;
      const clientBirthday = stringToDate(birthday.value);
      const clientAdditionalInfo = additionalInfo.value;

      return new Client(
        getClientId(),
        clientName,
        clientPhone,
        clientBirthday,
        clientAdditionalInfo
      );
    };

    /**
     * Handles the cancel button click and returns to the client list
     */
    const cancelAction = (): void => {
      router.go(-1);
    };

    /**
     * Handles the save button click and returns to the client list
     */
    const saveAction = (): void => {
      // validate data
      if (!validateData()) {
        return;
      }

      // parse data
      const newClient = parseCreateData();

      // create data
      clientService.create(newClient).then(() => {
        // return to client list
        router.go(-1);
      });
    };

    /**
     * Handles the edit button click and returns to the client list
     */
    const editAction = (): void => {
      // validate data
      if (!validateData()) {
        return;
      }

      // parse data
      const editedClient = parseUpdateData();

      // update data
      clientService.update(editedClient).then(() => {
        // return to client list
        router.go(-1);
      });
    };

    /**
     * Handles the delete button click and returns to the client list
     */
    const deleteAction = (): void => {
      // parse data
      const clientId = getClientId();

      // delete data
      clientService.delete(clientId).then(() => {
        // return to client list
        router.go(-2);
      });
    };

    // loading information on edit
    if (props.isEditing) {
      // getting the client being edited
      const clientId = getClientId();
      clientService.get(clientId).then((client: Client) => {
        // updating fields
        name.value = client.name;
        phone.value = client.phone;
        birthday.value = dateToString(client.birthday);
        additionalInfo.value = client.additionalInfo;
      });
    }

    // expose template variables
    return {
      name,
      phone,
      birthday,
      additionalInfo,
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
div.client-form {
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
