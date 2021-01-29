<template>
  <div class="scrollable-list">
    <TitleBar :title="title" :icon="icon" />
    <InputField
      hasIcon
      :icon="require('@/assets/img/search-solid.svg')"
      :placeholder="searchPlaceholder"
      v-model="searchValue"
      @update:modelValue="filterContent"
    />
    <div class="items">
      <ListItem
        v-for="item in filteredItems"
        :key="item.id"
        :content="item.name"
        @click="itemAction(item.id)"
      />
    </div>
    <AddCircleButton @click="addAction" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue';
import AddCircleButton from '@/components/AddCircleButton.vue';
import ListItem from '@/components/ListItem.vue';
import TitleBar from '@/components/TitleBar.vue';
import InputField from '@/components/InputField.vue';
import SortableListItem from '@/model/interface/sortable-list-item.interface.ts';

export default defineComponent({
  name: 'ScrollableList',
  components: {
    AddCircleButton,
    ListItem,
    TitleBar,
    InputField
  },
  props: {
    title: { type: String },
    icon: { type: String },
    items: { type: Object as PropType<SortableListItem[]>, default: [] },
    searchPlaceholder: { type: String },
    addAction: { type: Function },
    itemAction: { type: Function }
  },
  setup(props) {
    const searchValue = ref('');
    const filteredItems = ref(props.items);

    /**
     * Filters the content based on the query string in the search field
     */
    const filterContent = (): void => {
      filteredItems.value = props.items.filter((item: SortableListItem) => {
        return item.name
          .toLowerCase()
          .includes(searchValue.value.toLowerCase());
      });
    };

    return { searchValue, filteredItems, filterContent };
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
