import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Clients from '../views/Clients.vue';
import Services from '../views/Services.vue';
import ClientForm from '../views/ClientForm.vue';
import ServiceForm from '../views/ServiceForm.vue';
import ClientDetails from '../views/ClientDetails.vue';
import RecordForm from '../views/RecordForm.vue';

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
    path: '/clients/:id',
    name: 'ClientDetails',
    component: ClientDetails
  },
  {
    path: '/clients/new',
    name: 'NewClient',
    component: ClientForm
  },
  {
    path: '/clients/:clientId/records/new',
    name: 'NewRecord',
    component: RecordForm
  },
  {
    path: '/clients/:clientId/records/:recordId',
    name: 'EditRecord',
    props: { isEditing: true },
    component: RecordForm
  },
  {
    path: '/services/new',
    name: 'NewService',
    component: ServiceForm
  },
  {
    path: '/clients/:id/edit',
    name: 'EditClient',
    props: { isEditing: true },
    component: ClientForm
  },
  {
    path: '/services/:id/edit',
    name: 'EditService',
    props: { isEditing: true },
    component: ServiceForm
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
