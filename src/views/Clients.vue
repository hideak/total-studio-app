<template>
  <div class="clients">
    <div class="title">
      <img src="@/assets/img/user-friends-solid.svg" alt="Clients icon" />
      <span>Meus Clientes</span>
    </div>
    <div class="items">
      <ListItem content="Pessoa 1" />
      <ListItem content="Pessoa 2" />
      <ListItem content="Pessoa 3" />
    </div>
    <AddCircleButton />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AddCircleButton from '@/components/AddCircleButton.vue';
import ListItem from '@/components/ListItem.vue';

export default defineComponent({
  name: 'Clients',
  components: {
    AddCircleButton,
    ListItem
  }
});
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

div.clients {
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
