<template>
  <div class="input-field">
    <input
      class="input-field"
      :class="{ 'text-align-center': textAlignCenter }"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :inputmode="inputMode"
      :maxlength="maxLength"
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
    type: { type: String, default: 'text' },
    placeholder: { type: String, default: '' },
    hasIcon: { type: Boolean, default: false },
    icon: { type: String },
    disabled: { type: Boolean, default: false },
    inputMode: { type: String, default: '' },
    maxLength: { type: String, default: '' },
    textAlignCenter: { type: Boolean, default: false }
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

    &.text-align-center {
      text-align: center;
    }

    &:focus {
      outline: 2px solid $app-outline-color;
    }
  }

  input[type='date'] {
    -webkit-appearance: none;
    font-family: 'Roboto Regular';
    background-color: $app-background-color-white;
  }

  input:disabled,
  input[disabled] {
    background-color: $app-background-color-white;
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
