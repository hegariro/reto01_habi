<template>
  <div class="container">
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
        <TaskDetailTable v-for="task in tasks" :key="task.id" :task="task" />
      </tbody>
    </table>
    <PageLinks :links />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import TaskDetailTable from './task-detail-table.vue';
import PageLinks from './page-links.vue';

const props = defineProps(['tasks', 'pageData']);
const tasks = computed(() => (props.tasks || []));
const links = computed(() => (props.pageData?.links || []));
</script>