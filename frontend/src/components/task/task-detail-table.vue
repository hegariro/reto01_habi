<template>
  <tr>
    <th scope="row">{{ task.id }}</th>
    <td>{{ task.title }}</td>
    <td>{{ formatDate(task.published_at) }}</td>
    <td>{{ task?.author?.name }} {{ task?.author?.email }}</td>
    <td v-if="wasAssigned(task)">{{ task?.assigned_to?.name }} {{ task?.assigned_to?.email }}</td>
    <td v-else-if="canAssignable(task)">
      <button type="button" class="btn btn-primary" @click="handleResponsible(task.id)">
        Asignar tarea
      </button>
    </td>
    <tr v-else></tr>
    <td>{{ taskStatus(task) }}</td>
    <td>
      <div v-show="canDelete(task)">
        <button type="button" class="btn btn-danger" @click="handleDeleteTask(task.id)">
          Eliminar tarea
        </button>
      </div>
      <div v-show="canCheckedabled(task)">
        <button type="button" class="btn btn-success" @click="handleCheckedTask(task.id)">
          Marcar como completada
        </button>
      </div>
    </td>
  </tr>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '../../stores/auth/auth.store';

const authStore = useAuthStore();
const props = defineProps(['task']);
const emit = defineEmits(['delete-task', 'select-responsible']);
const task = computed(() => (props.task));

const formatDate = (dateString) => {
  return !!dateString && Intl.DateTimeFormat('en-GB', {
    year: "numeric", month: "numeric", day: "numeric", hour: "numeric",
    minute: "numeric", second: "numeric", hour12: false,
  }).format(Date.parse(dateString));
};
const wasAssigned = (info) => (!!info.assigned_to.email);
const canAssignable = (info) => (authStore.validateEmail(info.author.email) && !info.assigned_to.email);
const taskStatus = (info) => {
  if (!!info.is_completed) return 'Tarea completada';
  else if (!!info.assigned_to?.email) return 'Tarea asignada';
  return 'Tarea sin asignar';
};
const canDelete = (info) => (authStore.validateEmail(info?.author?.email) && !info?.assigned_to?.email);
const canCheckedabled = (info) => (authStore.validateEmail(info?.assigned_to?.email) && !info.is_completed);
const handleDeleteTask = (taskId) => (emit('delete-task', { taskId }));
const handleResponsible = (taskId) => (emit('select-responsible', { taskId }));
</script>