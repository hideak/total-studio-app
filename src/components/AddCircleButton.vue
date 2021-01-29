<template>
  <div class="add-circle-button">
    <img src="@/assets/img/plus-solid.svg" alt="Plus icon" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'AddCircleButton'
});
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

div.add-circle-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.75rem;
  height: 3.75rem;
  border-radius: 50%;
  background-color: $app-button-color-primary;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);

  img {
    height: 1.5625rem;
  }

  &:hover {
    cursor: pointer;
    background-color: $app-button-color-primary-hover;
  }

  &:active {
    cursor: pointer;
    background-color: $app-button-color-primary-active;
  }
}
</style>
