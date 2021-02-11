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
        <InputField placeholder="Digite o nome do serviço..." />
      </div>
      <div class="input-group">
        <Label
          label="Outras Informações"
          :src="require('@/assets/img/info-circle-solid.svg')"
        />
        <InputField placeholder="Digite outras informações do serviço..." />
      </div>
      <div class="buttons">
        <Button isAlternativeColor label="Salvar serviço" />
        <Button label="Cancelar" />
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

export default defineComponent({
  name: 'ServiceForm',
  components: {
    TitleBar,
    InputField,
    Label,
    Button
  },
  setup() {
    const isEditing = ref(false);

    /**
     * Returns a computed property depending on the edit mode
     */
    const header = computed(() => {
      return isEditing.value ? 'Editar serviço' : 'Cadastrar novo serviço';
    });

    // expose template variables
    return { isEditing, header };
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
