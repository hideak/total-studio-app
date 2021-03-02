<template>
  <div class="list-item">
    <div class="left-side">
      {{ content }}
    </div>
    <div class="right-side">
      <span v-if="sideContent">{{ sideContent }}</span>
      <img
        v-if="hasDeleteIcon"
        src="@/assets/img/minus-circle-solid.svg"
        alt="Remove icon"
        @click="deleteAction()"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ListItem',
  props: {
    isHoverable: { type: Boolean, default: true },
    content: { type: String, default: 'List Item' },
    sideContent: { type: String },
    hasDeleteIcon: { type: Boolean, default: false },
    deleteAction: { type: Function }
  }
});
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

div.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  font-size: 1.125rem;
  background-color: $app-background-color-white;
  border-top: 1px solid $app-border-color;

  div.right-side {
    display: flex;
    align-items: center;
    font-family: 'Roboto Condensed Regular';

    img {
      margin-left: 1rem;
      height: 1.5rem;
    }
  }

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
