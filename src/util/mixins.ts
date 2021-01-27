import { RouteLocation } from 'vue-router';
import router from '../router';

// Defines a global mixin object
const mixin = {
  methods: {
    navigateTo(route: RouteLocation) {
      router.push(route);
    }
  }
};

export default mixin;
