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
          @select-responsible="toggleModal"
        />
      </tbody>
    </table>
    <PageLinks :links />
    <Modal :modalActive v-show="!!modalActive">
      <template #header>Asignaci&oacute;n de tareas</template>
      <template #header-close>
        <span aria-hidden="true" @click="toggleModal">&times;</span>
      </template>
      <template #default>
        <button type="button" class="button-card"
          v-for="user in users"
          :key="user.id"
          @click="selectUser(user.id)"
        >
          <UserCard :user />
        </button>
      </template>
      <template #footer>
        <button type="button" class="btn btn-secondary" @click="toggleModal">
          Close
        </button>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useTaskStore } from '../../stores/task/task.store';
import { useUserStore } from '../../stores/user/user.store';
import TaskDetailTable from './task-detail-table.vue';
import PageLinks from './page-links.vue';
import UserCard from '../user/user-card.vue';
import Modal from '../modal/modal.vue';

const taskStore = useTaskStore();
const userStore = useUserStore();
const tasks = computed(() => taskStore.getAllTasks);
const links = computed(() => taskStore.pages);
const users = computed(() => userStore.getAllUsers);
const modalActive = ref(false);
const selectedData = ref({});

const deleteTask = ({ taskId }) => taskStore.deleteTask(taskId);
const assignTask = ({ taskId }) => taskStore.assignTask(taskId);
const toggleModal = ({ taskId }) => {
  selectedData.value.task = taskId;
  modalActive.value = !modalActive.value;
};
const selectUser = (userId) => {
  const taskId = selectedData.value.task;
  console.debug({taskId});
  taskStore.assignTaskToUser({taskId, userId});
  modalActive.value = false;
};

onMounted(async () => {
  await taskStore.setAllTasks();
  await userStore.setAllUsers();
});
</script>

<style scoped>
.button-card {
  border: none;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  text-align: left;
}
</style>