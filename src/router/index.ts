import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Clients from '../views/Clients.vue';
import Services from '../views/Services.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/clients',
    name: 'Clients',
    component: Clients
  },
  {
    path: '/services',
    name: 'Services',
    component: Services
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
