<template>
  <div class="edit-circle-button">
    <img src="@/assets/img/pen-solid.svg" alt="Edit icon" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'EditCircleButton'
});
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

div.edit-circle-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.375rem;
  height: 1.375rem;
  border-radius: 50%;
  background-color: $app-button-color-alternative;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);

  img {
    height: 0.625rem;
  }

  &:hover {
    cursor: pointer;
    background-color: $app-button-color-alternative-hover;
  }

  &:active {
    cursor: pointer;
    background-color: $app-button-color-alternative-active;
  }
}
</style>
