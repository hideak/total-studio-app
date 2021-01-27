<template>
  <RouterView v-slot="{ Component }">
    <Transition name="slide-fade" mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'App'
});
</script>

<style lang="scss">
@import '@/styles/global.scss';

div#app {
  height: 100%;
}
</style>
