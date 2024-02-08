import { ref, computed } from 'vue';
import { defineStore } from "pinia";
import { requestClient } from "../../_helpers/request.helper";

const baseUrlTasks = `${import.meta.env.VITE_BACKEND_URL_BASE}`;
const _LOCALSTORAGE_KEY_TASK = 'task';
const _LOCALSTORAGE_KEY_PAGINATION = 'pages';

const useTaskStore = defineStore('task', () => {
    const initialTaskValue = JSON.parse(localStorage.getItem(_LOCALSTORAGE_KEY_TASK)) || {};
    const initialPageValue = JSON.parse(localStorage.getItem(_LOCALSTORAGE_KEY_PAGINATION)) || {};
    const tasks = ref(initialTaskValue);
    const pages = ref(initialPageValue);
    const errors = ref([]);

    const setAllTasks = async () => {
        let statusLog, messageLog;
        try {
            const apiRes = await requestClient.get(`${baseUrlTasks}/tasks`);
            const { data: dataRes, status, ok } = apiRes;
            statusLog = status;
            messageLog = !ok ? (data?.message || '') : '';

            const { data, links: { first, prev, next, last }, meta } = dataRes;
            tasks.value = { ...data };
            localStorage.setItem(_LOCALSTORAGE_KEY_TASK, JSON.stringify(tasks.value));

            const { links } = meta;
            links.shift();
            links.pop();
            links.unshift(
                { url: first, label: 'first', active: false, disabled: !first },
                { url: prev, label: 'previous', active: false, disabled: !prev }
            );
            links.push(
                { url: next, label: 'next', active: false, disabled: !next },
                { url: last, label: 'last', active: false, disabled: !last }
            );

            pages.value = { ...meta, links };
            localStorage.setItem(_LOCALSTORAGE_KEY_PAGINATION, JSON.stringify(pages.value));
        } catch (err) {
            console.error('Error', {err});
        } finally {
            errors.value.unshift({ status: statusLog, message: messageLog, action: 'SetAllTasks', 
                datelog: (new Date()).toISOString()
            });
        }
    };

    const getAllTasks = computed(() => (Object.values(tasks.value)));

    return { pages, setAllTasks, getAllTasks };
});

export { useTaskStore };