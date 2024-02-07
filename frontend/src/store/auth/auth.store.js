import { defineStore } from "pinia";

import { requestClient } from "@/_helpers/request.helper";

const baseUrlAuth = `${import.meta.env.VITE_BACKEND_URL_BASE}`;
const _LOCALSTORAGE_KEY_LOGIN = 'auth';

const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        user: JSON.parse(localStorage.getItem(_LOCALSTORAGE_KEY_LOGIN)),
    }),
    actions: {
        async login(email, password) {
            try {
                const { token } = await requestClient.post(
                    `${baseUrlAuth}/login`,
                    { email, password }
                );
    
                this.user.token = token;
                localStorage.setItem(_LOCALSTORAGE_KEY_LOGIN, JSON.stringify(this.user));
                router.push({ name: 'home' });
            } catch (err) {
                console.error('Error', {err});
                // TODO add user notification
                router.push({ name: 'login' })
            }
        },
        async register({ email, password, name }) {
            try {
                const res = await requestClient.post(
                    `${baseUrlAuth}/register`,
                    { email, password, name }
                );

                router.push({ name: 'home' });
            } catch (err) {
                console.error('Error', {err});
                // TODO add user notification
                router.push({ name: 'register' })
            }
        },
        async logout() {
            if (!!user?.token) {
                const res = await requestClient.delete(
                    `${baseUrlAuth}/logout`,
                );
                localStorage.removeItem(_LOCALSTORAGE_KEY_LOGIN);
                this.user = {};
                router.push({ name: 'login' });
            }
        },
    },
});

export { useAuthStore };