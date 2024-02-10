import { ref, computed } from 'vue';
import { defineStore } from "pinia";
import { requestClient } from "../../_helpers/request.helper";
import { initValue, map2obj, map2array, array2map, getLinks as getLinksTool } from '../tools';

const baseUrlTasks = `${import.meta.env.VITE_BACKEND_URL_BASE}/tasks`;
const _LOCALSTORAGE_KEY_TASK = 'task';
const _LOCALSTORAGE_KEY_PAGINATION = 'task-pages';

const useTaskStore = defineStore('task', () => {
  const initialTaskValue = array2map(initValue(_LOCALSTORAGE_KEY_TASK), 'id');
  const initialPageValue = array2map(initValue(_LOCALSTORAGE_KEY_PAGINATION), 'current_page');
  const tasks = ref(initialTaskValue);
  const pages = ref(initialPageValue);
  const currentPage = ref(1);
  const errors = ref([]);

  const setAllTasks = async (page) => {
    let statusLog, messageLog;
    try {
      let url;
      if (!pages.value.size) url = baseUrlTasks;
      else url = pages.value.get(currentPage.value)
        .links.find(item => (item.label == page)).url;

      const apiRes = await requestClient.get(url);
      const { data: dataRes, status, ok } = apiRes;
      statusLog = status;
      messageLog = !ok && (data?.message || '');
      currentPage.value = dataRes.meta.current_page;

      const { data } = dataRes;
      tasks.value.set(currentPage.value, data);
      localStorage.setItem(_LOCALSTORAGE_KEY_TASK, JSON.stringify(map2obj(tasks.value)));
      const links = getLinksTool(dataRes.links, dataRes.meta);
      const newLinks = { ...dataRes.meta, links };
      !!newLinks?.current_page && pages.value.set(newLinks.current_page, newLinks);
      localStorage.setItem(_LOCALSTORAGE_KEY_PAGINATION, JSON.stringify(map2obj(pages.value)));
    } catch (err) {
      console.error('Error', { err });
    } finally {
      errors.value.unshift({
        status: statusLog, message: messageLog, action: 'SetAllTasks',
        datelog: (new Date()).toISOString()
      });
    }
  };

  const deleteTask = async (taskId) => {
    let statusLog;
    try {
      const apiRes = await requestClient.delete(`${baseUrlTasks}/tasks/${taskId}`);
      const { status } = apiRes;
      statusLog = status;
      if ([200, 204].includes(status)) {
        !!tasks.value.has(taskId) && tasks.value.delete(taskId);
        localStorage.removeItem(_LOCALSTORAGE_KEY_TASK, JSON.stringify(map2obj(tasks.value)));
      }
    } catch (err) {
      console.error('Error', { err });
    } finally {
      errors.value.unshift({
        status: statusLog, action: 'deleteTask',
        datelog: (new Date()).toISOString()
      });
    }
  };

  const assignTaskToUser = async ({ taskId, userId }) => {
    let statusLog, messageLog;
    try {
      const apiRes = await requestClient.patch(`${baseUrlTasks}/tasks/${taskId}/assign`, {
        assigned_to: userId,
      });
      const { data: dataRes, status, ok } = apiRes;
      statusLog = status;
      messageLog = (dataRes?.message || '');

      if ([200, 201, 204].includes(status)) {
        const aux = tasks.value.get(taskId);
        aux.assigned_to = userId;
        tasks.value.set(aux.id, aux);
        localStorage.setItem(_LOCALSTORAGE_KEY_TASK, JSON.stringify(map2obj(tasks.value)));
      }
    } catch (err) {
      console.error({ err });
    } finally {
      errors.value.unshift({
        status: statusLog, message: messageLog, action: 'SetAllTasks',
        datelog: (Date.now())
      });
    }
  };

  const getAllTasks = computed(() => (!tasks.value.size ? [] : map2array(tasks.value.get(currentPage.value))));
  // map2array(tasks.value.get(currentPage.value)));
  const getCurrentPage = computed(() => (currentPage.value));
  const getLinks = computed(() => (pages.value.get(currentPage.value)));

  return { errors, setAllTasks, getAllTasks, getCurrentPage, getLinks,
    deleteTask, assignTaskToUser
  };
});

export { useTaskStore };