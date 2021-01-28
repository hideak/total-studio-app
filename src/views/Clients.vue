<template>
  <div class="clients">
    <ScrollableList
      title="Meus Clientes"
      :icon="require('@/assets/img/user-friends-solid.svg')"
      :items="clients"
      :searchPlaceholder="'Pesquisar clientes...'"
      :addAction="clientAddAction"
      :itemAction="clientItemAction"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ScrollableList from '@/components/ScrollableList.vue';
import clients from '@/data/clients.data.ts';
import router from '@/router';

export default defineComponent({
  name: 'Clients',
  components: {
    ScrollableList
  },
  setup() {
    /**
     * Navigates to the new client screen
     */
    const clientAddAction = () => router.push({ name: 'NewClient' });

    /**
     * Navigates to the edit client screen
     */
    const clientItemAction = (id: number) =>
      router.push({ name: 'ClientDetails', params: { id } });

    // expose template variables
    return { clients, clientAddAction, clientItemAction };
  }
});
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

div.clients {
  height: 100%;
}
</style>
