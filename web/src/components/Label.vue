<template>
  <div class="label">
    <img :src="src" alt="Label icon" />
    {{ label }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Label',
  props: {
    src: { type: String },
    label: { type: String, default: 'Label' }
  }
});
</script>

<style lang="scss" scoped>
div.label {
  display: flex;
  align-items: center;
  padding: 0 1.25rem 1rem 1rem;

  img {
    height: 1.125rem;
    margin-right: 0.5rem;
  }
}
</style>
