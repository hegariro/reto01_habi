<template>
  <TasksList />
</template>

<script setup>
import { router } from '../../router';
import { useAuthStore } from '../../stores/auth/auth.store';
import TasksList from '../TasksList.vue';

const authStore = useAuthStore();
!authStore.isUserLoggedIn && router.push({ name: 'login' });
</script>