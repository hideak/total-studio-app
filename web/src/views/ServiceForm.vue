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
        <Button isAlternativeColor label="Salvar serviço" @click="saveAction" />
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

    /**
     * Returns a computed property depending on the edit mode
     */
    const header = computed(() => {
      return props.isEditing ? 'Editar serviço' : 'Cadastrar novo serviço';
    });

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
      if (!name.value) {
        window.alert('Digite um nome válido para o serviço.');
        return;
      }

      // parse data
      const serviceName = name.value;
      const serviceDetails = details.value;

      const newService = new Service(0, serviceName, serviceDetails);

      // create data
      serviceService.create(newService);

      // return to service list
      router.go(-1);
    };

    // expose template variables
    return { name, details, header, cancelAction, saveAction };
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
