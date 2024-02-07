import { ref, computed } from 'vue';
import { defineStore } from "pinia";
import { requestClient } from "../../_helpers/request.helper";

const baseUrlAuth = `${import.meta.env.VITE_BACKEND_URL_BASE}`;
const _LOCALSTORAGE_KEY_LOGIN = 'auth';

const useAuthStore = defineStore('auth', () => {
    const initialUserValue = JSON.parse(localStorage.getItem(_LOCALSTORAGE_KEY_LOGIN));
    const user = ref(initialUserValue);

    const login = async(email, password) => {
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
    };

    const register = async ({ email, password, name }) => {
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
    };

    const logout = async () => {
        if (!!user?.token) {
            const res = await requestClient.delete(
                `${baseUrlAuth}/logout`,
            );
            localStorage.removeItem(_LOCALSTORAGE_KEY_LOGIN);
            this.user = {};
            router.push({ name: 'login' });
        }
    }

    const isUserLoggedIn = computed((state) => !!state.user?.token);

    return { user, login, register, logout, isUserLoggedIn };
});

export { useAuthStore };