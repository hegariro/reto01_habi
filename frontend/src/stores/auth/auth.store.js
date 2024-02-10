import { ref, computed } from 'vue';
import { defineStore } from "pinia";
import { requestClient } from "../../_helpers/request.helper";
import { router } from '../../router';

const baseUrlAuth = `${import.meta.env.VITE_BACKEND_URL_BASE}`;
const _LOCALSTORAGE_KEY_AUTH = 'auth';
const _TIME_EXPIRATION_TOKEN = 21600000; // 6 horas en milisegundos

const isTokenExpired = (loginTime) => (Math.abs((Date.now()) - loginTime) > _TIME_EXPIRATION_TOKEN);
const initialUserValue = JSON.parse(localStorage.getItem(_LOCALSTORAGE_KEY_AUTH)) || {};

const deleteSession = () => {
  localStorage.removeItem(_LOCALSTORAGE_KEY_AUTH);
  user.value = initialUserValue;
  errors.value.unshift({
    status: statusLog,
    message: messageLog,
    action: 'delete-session',
    datelog: (new Date()).toISOString(),
  });
};

const useAuthStore = defineStore('auth', () => {
  const user = ref(initialUserValue);
  const errors = ref([]);

  const login = async ({ email, password }) => {
    let statusLog, messageLog;
    try {
      const apiResponse = await requestClient.post(
        `${baseUrlAuth}/login`,
        { email, password }
      );
      const {status, data: { token, email: emailBack, message }} = apiResponse;
      statusLog = status;
      messageLog = message;
      
      user.value = { token, email: emailBack, datelog: (Date.now()) };
      localStorage.setItem(_LOCALSTORAGE_KEY_AUTH, JSON.stringify(user.value));
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
    const res = await requestClient.delete(
      `${baseUrlAuth}/logout`,
    );
    deleteSession();
    // TODO add user notification
    errors.value.unshift({
      status: statusLog,
      message: messageLog,
      action: 'Logout',
      datelog: (new Date()).toISOString(),
    });
    router.push({ name: 'login' });
  }

  const isUserLoggedIn = computed(() => (!!user.value?.token));
  const getLastStatus = computed(() => (errors.value[0]));
  const validateEmail = computed(() => (email) => (email === user.value.email));

  return { user, login, register, logout, isUserLoggedIn, getLastStatus, 
    validateEmail };
});

export { useAuthStore, deleteSession };