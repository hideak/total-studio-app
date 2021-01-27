<template>
  <div class="scrollable-list">
    <TitleBar :title="title" :icon="icon" />
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
import TitleBar from '@/components/TitleBar.vue';

export default defineComponent({
  name: 'ScrollableList',
  components: {
    AddCircleButton,
    ListItem,
    TitleBar
  },
  props: {
    title: { type: String },
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
