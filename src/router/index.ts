import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Clients from '../views/Clients.vue';
import Services from '../views/Services.vue';
import ClientForm from '../views/ClientForm.vue';
import ServiceForm from '../views/ServiceForm.vue';

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
  },
  {
    path: '/clients/new',
    name: 'NewClient',
    component: ClientForm
  },
  {
    path: '/services/new',
    name: 'NewService',
    component: ServiceForm
  },
  {
    path: '/clients/:id/edit',
    name: 'EditClient',
    component: ClientForm
  },
  {
    path: '/services/:id/edit',
    name: 'EditService',
    component: ServiceForm
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
