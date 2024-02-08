<template>
  <h1>Tasks List</h1>
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
          <th scope="row">{{ task.id }}</th>
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
            <div v-show="canDelete(task)">
              <button type="button" class="btn btn-danger" @click="deleteTask(task.id)">
                Eliminar tarea
              </button>
            </div>
            <div v-show="canCheckedabled(task)">
              <button type="button" class="btn btn-success" @click="checkedTask(task.id)">
                Marcar como completada
              </button>
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
const taskIsAssigned = (info) => (!!info.assigned_to?.email);
const taskStatus = (info) => {
  if (!!info.is_completed) return 'Tarea completada';
  else if (!!info.assigned_to?.email) return 'Tarea asignada';
  return 'Tarea sin asignar';
};
const canDelete = (info) => (authStore.validateEmail(info.author.email) && !info.assigned_to?.email);
const canCheckedabled = (info) => (authStore.validateEmail(info.assigned_to.email) && !info.is_completed);
</script>