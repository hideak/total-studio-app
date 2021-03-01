<template>
  <div class="services">
    <ScrollableList
      title="Meus Serviços"
      :icon="require('@/assets/img/cut-solid.svg')"
      :searchPlaceholder="'Pesquisar serviços...'"
      :items="services"
      :addAction="serviceAddAction"
      :itemAction="serviceItemAction"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from 'vue';
import ScrollableList from '@/components/ScrollableList.vue';
import DatabaseConnection from '@/model/interface/database-connection.interface';
import GenericService from '@/services/shared/generic-service';
import Service from '@/model/service.model';
import ServiceCreate from '@/model/dto/service-create';
import router from '@/router';

export default defineComponent({
  name: 'Services',
  components: {
    ScrollableList
  },
  setup() {
    const services = ref();

    // initializing database
    const db: DatabaseConnection = inject('dbConnection') as DatabaseConnection;
    const serviceService = new GenericService<Service, ServiceCreate>(
      db,
      'services'
    );

    // get service data
    serviceService.getAll().then((entities: Service[]) => {
      services.value = entities;
    });

    /**
     * Navigates to the new service screen
     */
    const serviceAddAction = () => router.push({ name: 'NewService' });

    /**
     * Navigates to the edit service screen
     */
    const serviceItemAction = (id: number) =>
      router.push({ name: 'EditService', params: { id } });

    // expose template variables
    return { services, serviceAddAction, serviceItemAction };
  }
});
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

div.services {
  height: 100%;
}
</style>
