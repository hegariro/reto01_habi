import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from "../stores/auth/auth.store";
import { AuthRoutes } from './auth';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { ...AuthRoutes },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ]
});

router.beforeEach(async (to) => {
  console.debug('path', to.path);
  const publicPages = [ '/auth/login', '/auth/register' ];
  const authRequired = !publicPages.includes(to.path);
  const authStore = useAuthStore();

  if (authRequired && !authStore.user) {
    authStore.returnUrl = to.fullPath;
    return '/auth/login';
  }
});

export {router};
