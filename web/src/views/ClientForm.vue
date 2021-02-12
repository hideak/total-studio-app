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
        <Button isAlternativeColor label="Salvar cliente" @click="saveAction" />
        <Button label="Cancelar" @click="cancelAction" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import TitleBar from '@/components/TitleBar.vue';
import InputField from '@/components/InputField.vue';
import Label from '@/components/Label.vue';
import Button from '@/components/Button.vue';
import Client from '@/model/client.model.ts';
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
  setup() {
    const isEditing = ref(false);
    const name = ref('');
    const phone = ref('');
    const birthday = ref('');
    const additionalInfo = ref('');
    const clientService = new ClientMockService();

    /**
     * Returns a computed property depending on the edit mode
     */
    const header = computed(() => {
      return isEditing.value ? 'Editar cliente' : 'Cadastrar novo cliente';
    });

    /**
     * Handles the cancel button click and returns to the client list
     */
    const cancelAction = (): void => {
      router.push({ name: 'Clients' });
    };

    /**
     * Handles the save button click and returns to the client list
     */
    const saveAction = (): void => {
      // validate data
      if (!name.value) {
        window.alert('Digite um nome válido para o cliente.');
        return;
      }

      // parse data
      const clientName = name.value;
      const clientPhone = phone.value;
      const clientBirthday = !isNaN(Date.parse(birthday.value))
        ? new Date(Date.parse(birthday.value))
        : null;
      const clientAdditionalInfo = additionalInfo.value;

      const newClient = new Client(
        0,
        clientName,
        clientPhone,
        clientBirthday,
        clientAdditionalInfo,
        []
      );

      // create data
      clientService.create(newClient);

      // return to client list
      router.push({ name: 'Clients' });
    };

    // expose template variables
    return {
      isEditing,
      name,
      phone,
      birthday,
      additionalInfo,
      header,
      cancelAction,
      saveAction
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
