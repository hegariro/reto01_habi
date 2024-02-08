import { ref, computed } from 'vue';
import { defineStore } from "pinia";
import { requestClient } from "../../_helpers/request.helper";

const baseUrlAuth = `${import.meta.env.VITE_BACKEND_URL_BASE}`;
const _LOCALSTORAGE_KEY_LOGIN = 'auth';

const useAuthStore = defineStore('auth', () => {
  const initialUserValue = JSON.parse(localStorage.getItem(_LOCALSTORAGE_KEY_LOGIN)) || {};
  const user = ref(initialUserValue);
  const errors = ref([]);

  const login = async ({ email, password }) => {
    let statusLog, messageLog;
    try {
      const apiResponse = await requestClient.post(
        `${baseUrlAuth}/login`,
        { email, password }
      );
      const {status, data: { token, message }} = apiResponse;
      statusLog = status;
      messageLog = message;
      
      user.value = { token };
      localStorage.setItem(_LOCALSTORAGE_KEY_LOGIN, JSON.stringify(user.value));
    } catch (err) {
      console.error('Error', { err });
    } finally {
      errors.value.unshift({
        status: statusLog,
        message: messageLog,
        action: 'Login',
        datelog: (new Date()).toISOString(),
      });
    }
  };

  const register = async ({ email, password, name }) => {
    let statusLog, messageLog;
    try {
      const apiResponse = await requestClient.post(
        `${baseUrlAuth}/register`,
        { email, password, name }
      );
      const {status, data: { message }} = apiResponse;
      statusLog = status;
      messageLog = message;
    } catch (err) {
      console.error('Error', { err });
    } finally {
      // TODO add user notification
      errors.value.unshift({
        status: statusLog,
        message: messageLog,
        action: 'Register',
        datelog: (new Date()).toISOString(),
      });
    }
  };

  const logout = async () => {
    if (!!user.value?.token) {
      const res = await requestClient.delete(
        `${baseUrlAuth}/logout`,
      );
      localStorage.removeItem(_LOCALSTORAGE_KEY_LOGIN);
      user.value = {};
      // TODO add user notification
      errors.value.unshift({
        status: statusLog,
        message: messageLog,
        action: 'Register',
        datelog: (new Date()).toISOString(),
      });
    }
  }

  const isUserLoggedIn = computed(() => (!!user.value?.token));
  const getLastStatus = computed(() => (errors.value[0]));

  return { user, login, register, logout, isUserLoggedIn, getLastStatus };
});

export { useAuthStore };