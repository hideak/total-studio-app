<template>
  <div class="card">
    {{ description }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Card',
  props: {
    description: { type: String, default: 'Card Description' }
  }
});
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

div.card {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3.75rem;
  padding: 0 2rem;
  background-color: $app-background-color-white;
  border-radius: 0.25rem;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  font-size: 1.25rem;
  transition: transform 0.1s ease-in;

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
}
</style>
