<template>
  <div class="client-details">
    <TitleBar
      title="Meus Clientes"
      :icon="require('@/assets/img/user-friends-solid.svg')"
    />
    Client details works!
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TitleBar from '@/components/TitleBar.vue';

export default defineComponent({
  name: 'ClientDetails',
  components: {
    TitleBar
  }
});
</script>

<style lang="scss" scoped></style>
