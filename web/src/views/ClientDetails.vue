<template>
  <div class="client-details">
    <TitleBar
      title="Meus Clientes"
      :icon="require('@/assets/img/user-friends-solid.svg')"
    />
    <div class="content">
      <div class="name">{{ name }}</div>
      <div class="services">
        <img src="@/assets/img/cut-solid.svg" alt="Services icon" />
        Serviços realizados
      </div>
      <div class="items">
        <ServiceItem />
        <ServiceItem />
        <ServiceItem />
        <ServiceItem />
        <ServiceItem />
        <ServiceItem />
        <ServiceItem />
        <ServiceItem />
        <ServiceItem />
        <ServiceItem />
        <ServiceItem />
        <ServiceItem />
        <ServiceItem />
      </div>
    </div>
    <AddCircleButton />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TitleBar from '@/components/TitleBar.vue';
import ServiceItem from '@/components/ServiceItem.vue';
import AddCircleButton from '@/components/AddCircleButton.vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'ClientDetails',
  components: {
    TitleBar,
    ServiceItem,
    AddCircleButton
  },
  setup() {
    const route = useRoute();
    const name = `Cliente ${route.params.id} (Mock)`;

    // exposed template variables
    return { name };
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
