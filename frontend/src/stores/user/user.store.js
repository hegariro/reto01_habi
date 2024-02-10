import { ref, computed } from 'vue';
import { defineStore } from "pinia";
import { requestClient } from "../../_helpers/request.helper";
import { initValue, map2array, array2map, getLinks } from '../tools';

const baseUrlUser = `${import.meta.env.VITE_BACKEND_URL_BASE}`;
const _LOCALSTORAGE_KEY_USER = 'user';
const _LOCALSTORAGE_KEY_PAGES = 'user-pages';

const useUserStore = defineStore('user', () => {
  const initialUserValue = array2map(initValue(_LOCALSTORAGE_KEY_USER));
  const initialPagesValue = array2map(initValue(_LOCALSTORAGE_KEY_PAGES));
  const users = ref(initialUserValue);
  const pages = ref(initialPagesValue);
  const errors = ref([]);

  const setAllUsers = async () => {
    let statusLog, messageLog;
    try {
      const apiRes = await requestClient.get(`${baseUrlUser}/users`);
      const { data: dataRes, status, ok } = apiRes;
      statusLog = status;
      messageLog = !ok ? (data?.message || '') : '';

      const { data } = dataRes;
      data.map(user => users.value.set(user.id, user));
      localStorage.setItem(_LOCALSTORAGE_KEY_USER, JSON.stringify(map2array(users.value)));
      const links = getLinks(dataRes.links, dataRes.meta);
      const aux = { ...dataRes.meta, links };
      pages.value.set(aux.current_page, aux);
      localStorage.setItem(_LOCALSTORAGE_KEY_PAGES, JSON.stringify(map2array(pages.value)));
    } catch (err) {
      console.error('Error', { err });
    } finally {
      errors.value.unshift({
        status: statusLog, message: messageLog, action: 'SetAllUsers',
        datelog: (new Date()).toISOString()
      });
    }
  };

  const getAllUsers = computed(() => map2array(users.value));
  const getUserPages = computed(() => map2array(pages.value));
  const getUserById = computed(() => (id) => users.value.get(id));

  return { setAllUsers, getAllUsers, getUserPages, getUserById };
});

export { useUserStore };