<template>
  <button
    v-bind:class="{ 'alternative-color': isAlternativeColor }"
    class="button"
  >
    {{ label }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Button',
  props: {
    label: { type: String, default: 'Label' },
    isAlternativeColor: { type: Boolean, default: false }
  }
});
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

button.button {
  padding: 1rem 1.5rem;
  color: $app-font-color-white;
  background-color: $app-button-color-primary;
  border-radius: 0.25rem;
  box-shadow: 0.125rem 0.125rem 0.25rem rgba(0, 0, 0, 0.25);
  border: none;
  outline: none;
  width: 100%;
  font-size: 1.5rem;
  font-family: 'Roboto Regular';

  &.alternative-color {
    background-color: $app-button-color-alternative;
  }

  &:hover {
    cursor: pointer;
    background-color: $app-button-color-primary-hover;

    &.alternative-color {
      background-color: $app-button-color-alternative-hover;
    }
  }

  &:active {
    cursor: pointer;
    background-color: $app-button-color-primary-active;

    &.alternative-color {
      background-color: $app-button-color-alternative-active;
    }
  }
}
</style>
