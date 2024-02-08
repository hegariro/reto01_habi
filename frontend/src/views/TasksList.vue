<template>
  <h1>Tasks List</h1>
  <TasksTable v-show="!!tasks.length" :tasks="tasks" :pageData="pagesLinks" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useTaskStore } from '../stores/task/task.store';
import TasksTable from '../components/task/tasks-table.vue';

const taskStore = useTaskStore();
const tasks = ref(taskStore.getAllTasks);
const pagesLinks = ref(taskStore.pages);

onMounted(async () => (await taskStore.setAllTasks()));
</script>