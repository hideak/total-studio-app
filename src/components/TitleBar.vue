<template>
  <div class="title-bar">
    <img :src="icon" alt="Clients icon" />
    <span>{{ title }} </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TitleBar',
  props: {
    title: { type: String, default: 'Title Bar' },
    icon: { type: String }
  }
});
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

div.title-bar {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem 0 1.5rem 0;
  font-size: 1.5rem;
  background-color: $app-background-color;

  img {
    height: 1.875rem;
    margin-right: 1rem;
  }
}
</style>
