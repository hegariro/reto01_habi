<script setup>
import { computed } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';
import { useAuthStore } from './stores/auth/auth.store';

const authStore = useAuthStore();

const isLogged = computed(() => authStore.isUserLoggedIn);
</script>

<template>
  <header>
    <HelloWorld msg="Tasks Challenge" />
    <div class="col" v-if="!isLogged">
      <router-link :to="{ name: 'login' }">Login</router-link>
      <router-link :to="{ name: 'register' }">Registro</router-link>
    </div>
    <div class="col" v-else>
      <router-link :to="{ name: 'all-tasks' }">Tareas</router-link>
      <!-- <router-link :to="{ name: 'users' }">Usuarios</router-link> -->
      <router-link :to="{ name: 'logout' }">Cerrar sesi&oacute;n</router-link>
    </div>
  </header>

  <RouterView />
</template>

<style scoped></style>
