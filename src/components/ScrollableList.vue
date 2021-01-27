<template>
  <div class="scrollable-list">
    <div class="title">
      <img :src="icon" alt="Clients icon" />
      <span>{{ title }} </span>
    </div>
    <div class="items">
      <ListItem
        v-for="item in items"
        :key="item.id"
        :content="item.name"
        @click="itemAction(item.id)"
      />
    </div>
    <AddCircleButton @click="addAction" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AddCircleButton from '@/components/AddCircleButton.vue';
import ListItem from '@/components/ListItem.vue';

export default defineComponent({
  name: 'ScrollableList',
  components: {
    AddCircleButton,
    ListItem
  },
  props: {
    title: { type: String, default: 'Scrollable List' },
    icon: { type: String },
    items: { type: Array },
    addAction: { type: Function },
    itemAction: { type: Function }
  }
});
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

div.scrollable-list {
  display: flex;
  flex-direction: column;
  height: 100%;
}

div.title {
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

div.items {
  flex-grow: 1;
  overflow-y: scroll;
}

div.add-circle-button {
  position: fixed;
  right: 1.375rem;
  bottom: 1.375rem;
}
</style>
