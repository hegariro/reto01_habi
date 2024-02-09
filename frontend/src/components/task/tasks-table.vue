<template>
  <div v-show="!!tasks.length" class="container">
    <table class="table table-sm table-striped table-dark">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Tarea</th>
          <th scope="col">Publicada</th>
          <th scope="col">Autor</th>
          <th scope="col">Asignada a</th>
          <th scope="col">Estado</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <TaskDetailTable
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          @delete-task="deleteTask"
        />
      </tbody>
    </table>
    <PageLinks :links />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useTaskStore } from '../../stores/task/task.store';
import TaskDetailTable from './task-detail-table.vue';
import PageLinks from './page-links.vue';

const taskStore = useTaskStore();
const tasks = computed(() => taskStore.getAllTasks);
const links = computed(() => taskStore.pages);

onMounted(() => (taskStore.setAllTasks()));

const deleteTask = ({ taskId }) => taskStore.deleteTask(taskId);
</script>