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
        <InputField placeholder="Selecione um serviço..." />
      </div>
      <div class="input-group">
        <Label
          label="Data"
          :src="require('@/assets/img/calendar-day-solid.svg')"
        />
        <InputField placeholder="Selecione uma data..." />
      </div>
      <div class="input-group">
        <Label label="Horário" :src="require('@/assets/img/clock-solid.svg')" />
        <InputField placeholder="Selecione um horário..." />
      </div>
      <div class="input-group">
        <Label
          label="Detalhes do serviço"
          :src="require('@/assets/img/info-circle-solid.svg')"
        />
        <InputField placeholder="Digite outras informações do registro..." />
      </div>
      <div class="buttons">
        <Button isAlternativeColor label="Salvar registro" />
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
  name: 'RecordForm',
  components: {
    TitleBar,
    InputField,
    Label,
    Button
  },
  setup() {
    const isEditing = ref(false);
    const name = 'Client name (Mock)';

    /**
     * Returns a computed property depending on the edit mode
     */
    const header = computed(() => {
      return isEditing.value
        ? 'Editar registro de serviço'
        : 'Novo registro de serviço';
    });

    // expose template variables
    return { isEditing, name, header };
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
