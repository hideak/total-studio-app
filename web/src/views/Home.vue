<template>
  <div class="home">
    <div class="header">
      <div class="title">Total Studio</div>
      <div class="subtitle">Salão de Beleza</div>
    </div>
    <div class="logo">
      <img src="@/assets/img/app-logo.jpg" alt="Logo do aplicativo" />
    </div>
    <div class="instructions">Selecione uma opção</div>
    <div class="cards">
      <Card
        description="Meus Clientes"
        @click="navigateTo({ name: 'Clients' })"
      />
      <Card
        description="Meus Serviços"
        @click="navigateTo({ name: 'Services' })"
      />
    </div>
    <div class="footer">Total Studio v1.0 @ 2021</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Card from '@/components/Card.vue';

export default defineComponent({
  name: 'Home',
  components: {
    Card
  }
});
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
div.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

div.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0 2rem 0;
}

div.logo img {
  height: 6rem;
  margin-bottom: 2rem;
}

div.title {
  font-family: $app-font-family-title;
  font-size: 2.25rem;
}

div.subtitle {
  font-family: $app-font-family-subtitle;
  font-size: 1.5rem;
}

div.instructions {
  margin-bottom: 2rem;
}

div.cards {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 1.25rem;
  width: 100%;
  padding: 0 2rem;
  box-sizing: border-box;
  margin-bottom: 2rem;
}
</style>
