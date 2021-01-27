<template>
  <div class="services">
    <ScrollableList
      title="Meus Serviços"
      :icon="require('@/assets/img/cut-solid.svg')"
      :items="services"
      :addAction="serviceAddAction"
      :itemAction="serviceItemAction"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ScrollableList from '@/components/ScrollableList.vue';
import services from '@/data/services.data.ts';
import router from '@/router';

export default defineComponent({
  name: 'Services',
  components: {
    ScrollableList
  },
  setup() {
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
