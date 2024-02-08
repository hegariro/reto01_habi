<template>
  <h1>
    Tasks List
  </h1>
  <div v-show="!!allTasks.length">
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
      <tr v-for="task in allTasks" :key="task.id">
        <th scope="row">{{task.id}}</th>
        <td>{{ task.title }}</td>
        <td>{{ formatDate(task.published_at) }}</td>
        <td>{{ task.author.name }} {{ task.author.email }}</td>
        <td v-if="taskIsAssigned(task)">{{ task.assigned_to.name }} {{ task.assigned_to.email }}</td>
        <td v-else>
          <button type="button" class="btn btn-primary">
            Asignar tarea</button>
        </td>
        <td>{{ taskStatus(task) }}</td>
        <td>
          <div v-show="isOwner(task.author)">
            <!-- Si la tarea no está asignada la puede eliminar -->
          </div>
          <div v-show="isResponsible(task.assigned_to)">
            <!-- puede ver el botón para completar la tarea -->
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <nav aria-label="Page navigation">
    <ul class="pagination justify-content-end">
      <li class="page-item disabled">
        <a class="page-link">Anterior</a>
      </li>
      <li class="page-item"><a class="page-link" href="#">1</a></li>
      <li class="page-item"><a class="page-link" href="#">2</a></li>
      <li class="page-item"><a class="page-link" href="#">3</a></li>
      <li class="page-item">
        <a class="page-link" href="#">Siguiente</a>
      </li>
    </ul>
  </nav>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useTaskStore } from '../stores/task/task.store';
import { useAuthStore } from '../stores/auth/auth.store';

const authStore = useAuthStore();
const taskStore = useTaskStore();
const allTasks = ref(taskStore.getAllTasks);

onMounted(async () => (await taskStore.setAllTasks()));

const formatDate = (dateString) => {
  return Intl.DateTimeFormat('en-GB', {
    year: "numeric", month: "numeric", day: "numeric", hour: "numeric",
    minute: "numeric", second: "numeric", hour12: false,
  }).format(Date.parse(dateString));
};
const taskIsAssigned = (info) => (!!info.assigned_to.name);
const taskStatus = (info) => {
  if (!!info.is_completed) return 'Tarea completada';
  else if (!!info.assigned_to.name) return 'Tarea asignada';
  return 'Tarea sin asignar';
};
const isOwner = (author) => (authStore.validateEmail(author.email));
const isResponsible = (responsible) => (authStore.validateEmail(responsible.email));
</script>