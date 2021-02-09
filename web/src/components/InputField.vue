<template>
  <div class="input-field">
    <input
      class="input-field"
      type="text"
      :value="modelValue"
      :placeholder="placeholder"
      @input="inputHandler"
    />
    <img v-if="hasIcon" :src="icon" alt="Search icon" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'InputField',
  props: {
    modelValue: { type: String },
    placeholder: { type: String, default: '' },
    hasIcon: { type: Boolean, default: false },
    icon: { type: String }
  },
  emits: ['update:modelValue'],
  setup(props, context) {
    /**
     * Handles the input event of the input element
     * @param event the native event from where to grab the input value
     */
    const inputHandler = (event: InputEvent): void => {
      const value = (event.target as HTMLInputElement).value;
      context.emit('update:modelValue', value);
    };

    // expose template variables
    return { inputHandler };
  }
});
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

div.input-field {
  position: relative;
  display: flex;
  align-items: center;
  background-color: $app-background-color-white;
  border-top: 1px solid $app-border-color;
  border-bottom: 1px solid $app-border-color;

  input.input-field {
    flex-grow: 1;
    padding: 1rem 1.25rem;
    border: none;
    font-size: 1.125rem;

    &:focus {
      outline: 2px solid $app-outline-color;
    }
  }

  img {
    position: absolute;
    right: 0;
    height: 1.5rem;
    margin-right: 1.25rem;
    pointer-events: none;
  }
}
</style>