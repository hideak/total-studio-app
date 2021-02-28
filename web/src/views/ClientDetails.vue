<template>
  <div class="client-details">
    <TitleBar
      title="Meus Clientes"
      :icon="require('@/assets/img/user-friends-solid.svg')"
    />
    <div class="content">
      <div class="name">
        {{ client ? client.name : '' }}
        <EditCircleButton @click="clientEditAction" />
      </div>
      <div class="services">
        <img src="@/assets/img/cut-solid.svg" alt="Services icon" />
        Serviços realizados
      </div>
      <div class="items">
        <ServiceItem
          v-for="record in clientRecords"
          :key="record.id"
          :record="record"
          @click="recordItemAction(record.id)"
        />
      </div>
    </div>
    <AddCircleButton @click="recordAddAction()" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import TitleBar from '@/components/TitleBar.vue';
import ServiceItem from '@/components/ServiceItem.vue';
import AddCircleButton from '@/components/AddCircleButton.vue';
import EditCircleButton from '@/components/EditCircleButton.vue';
import Client from '@/model/client.model';
import ClientMockService from '@/services/client-mock-service.ts';
import Record from '@/model/record.model';
import RecordMockService from '@/services/record-mock-service.ts';
import router from '@/router';

export default defineComponent({
  name: 'ClientDetails',
  components: {
    TitleBar,
    ServiceItem,
    AddCircleButton,
    EditCircleButton
  },
  setup() {
    const client = ref();
    const clientRecords = ref();
    const clientService = new ClientMockService();
    const recordService = new RecordMockService();
    const route = useRoute();

    // getting the id of the client
    const clientId = parseInt(route.params.id as string, 10);

    // getting the client object and associated records
    clientService
      .get(clientId)
      .then((entity: Client) => {
        client.value = entity;
        return recordService.getByClientId(entity.id);
      })
      .then((entities: Record[]) => {
        clientRecords.value = entities;
      });

    /**
     * Navigates to the new record screen
     */
    const recordAddAction = (): void => {
      router.push({ name: 'NewRecord', params: { clientId: clientId } });
    };

    /**
     * Navigates to the edit record screen
     */
    const recordItemAction = (recordId: number): void => {
      router.push({
        name: 'EditRecord',
        params: { clientId: clientId, recordId: recordId }
      });
    };

    /**
     * Navigates to the edition of the client
     */
    const clientEditAction = (): void => {
      router.push({ name: 'EditClient', params: { id: clientId } });
    };

    // exposed template variables
    return {
      client,
      clientRecords,
      recordAddAction,
      recordItemAction,
      clientEditAction
    };
  }
});
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

div.client-details {
  height: 100%;
  display: flex;
  flex-direction: column;

  div.content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: hidden;

    div.name {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: $app-background-color-white;
      padding: 1rem 1.25rem 1rem 1rem;
      font-size: 1.125rem;
    }

    div.services {
      display: flex;
      align-items: center;
      border-bottom: 1px solid $app-border-color;
      padding: 0 1.25rem 1rem 1rem;
      background-color: $app-background-color-white;

      img {
        height: 1.125rem;
        margin-right: 0.5rem;
      }
    }

    div.items {
      flex-grow: 1;
      overflow-y: scroll;
    }
  }

  div.add-circle-button {
    position: fixed;
    right: 1.375rem;
    bottom: 1.375rem;
  }
}
</style>
