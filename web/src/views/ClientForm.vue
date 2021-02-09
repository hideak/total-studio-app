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
        <InputField />
      </div>
      <div class="input-group">
        <Label
          label="Aniversário"
          :src="require('@/assets/img/birthday-cake-solid.svg')"
        />
        <InputField />
      </div>
      <div class="input-group">
        <Label
          label="Outras Informações"
          :src="require('@/assets/img/info-circle-solid.svg')"
        />
        <InputField />
      </div>
    </div>
    <div class="buttons">
      <Button isAlternativeColor label="Salvar cliente" />
      <Button label="Cancelar" />
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
  name: 'ClientForm',
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
      return isEditing.value ? 'Editar cliente' : 'Cadastrar novo cliente';
    });

    // expose template variables
    return { isEditing, header };
  }
});
</script>

<style lang="scss" scoped>
div.client-form {
  display: flex;
  flex-direction: column;
}

div.content {
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
