import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from "../stores/auth/auth.store";
import { AuthRoutes } from './auth';
import { TaskRoutes } from './task';
import HomeView from '../components/HelloWorld.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { ...AuthRoutes },
    { ...TaskRoutes },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ]
});

router.beforeEach(async (to) => {
  const publicPages = [ '/auth/login', '/auth/register' ];
  const authRequired = !publicPages.includes(to.path);
  const authStore = useAuthStore();

  if (authRequired && !authStore.user) {
    authStore.returnUrl = to.fullPath;
    return '/auth/login';
  }
});

export {router};
