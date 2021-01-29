<template>
  <div class="list-item">
    {{ content }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ListItem',
  props: {
    content: { type: String, default: 'List Item' }
  }
});
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

div.list-item {
  padding: 1rem 1.25rem;
  font-size: 1.125rem;
  background-color: $app-background-color-white;
  border-top: 1px solid $app-border-color;

  &:hover {
    cursor: pointer;
    color: $app-font-color-white;
    background-color: $app-button-color-alternative-hover;
  }

  &:active {
    cursor: pointer;
    color: $app-font-color-white;
    background-color: $app-button-color-alternative-active;
  }
}
</style>
