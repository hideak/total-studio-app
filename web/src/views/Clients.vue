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
import { defineComponent, inject, ref } from 'vue';
import ScrollableList from '@/components/ScrollableList.vue';
import DatabaseConnection from '@/model/interface/database-connection.interface';
import GenericService from '@/services/shared/generic-service';
import ClientCreate from '@/model/dto/client-create';
import Client from '@/model/client.model';
import router from '@/router';

export default defineComponent({
  name: 'Clients',
  components: {
    ScrollableList
  },
  setup() {
    const clients = ref();

    // initializing database
    const db: DatabaseConnection = inject('dbConnection') as DatabaseConnection;
    const clientService = new GenericService<Client, ClientCreate>(
      db,
      'clients'
    );

    // get client data
    clientService.getAll().then((entities: Client[]) => {
      clients.value = entities;
    });

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
