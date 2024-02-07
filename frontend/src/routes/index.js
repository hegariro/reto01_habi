import { createRouter, createWebHistory } from "vue-router";

import { useAuthStore } from "@/store/auth/auth.store";

import Home from '@/views/Home';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    linkedActiveClass: 'active',
    routes: [
        { path: '/', name: 'home', component: Home },
        { path: '/:pathMatch(.*)*', redirect: '/' }
    ]
});

router.beforeEach(async (to) => {
    const publicPages = [ '/user/login', '/user/register' ];
    const authRequired = !publicPages.includes(to.path);
    const authStore = useAuthStore();

    if (authRequired && !authStore.user) {
        authStore.returnUrl = to.fullPath;
        return '/user/login';
    }
});

export { router };