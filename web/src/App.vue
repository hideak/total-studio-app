<template>
  <RouterView v-slot="{ Component }">
    <Transition name="slide-fade" mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>
  <div id="modal"></div>
</template>

<script lang="ts">
import { defineComponent, provide } from 'vue';
import { dbConnect } from '@/util/idb';
import DatabaseConnection from './model/interface/database-connection.interface';

export default defineComponent({
  name: 'App',
  setup() {
    // Connecting to the Indexed DB
    const dbConnection: DatabaseConnection = {
      dbName: 'StudioDB',
      dbVersion: 1
    };

    dbConnect(dbConnection).then();
    provide('dbConnection', dbConnection);
  }
});
</script>

<style lang="scss">
@import '@/styles/global.scss';

div#app {
  height: 100%;
}
</style>
