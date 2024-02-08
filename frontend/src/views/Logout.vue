<template>
  <div class="container">
    <LogoutForm />
    <RouterLink class="register-form" :to="{ name: 'all-tasks' }">
      Ir al dashboard de tareas
    </RouterLink>
  </div>
</template>

<script setup>
import LogoutForm from '../components/auth/logout-form.vue';
</script>

<style scoped>
.container {
  display: flexbox;
  flex-direction: column;
  margin-top: 3rem;
  padding-left: 2rem;
}
.register-form {
  display: block;
  margin-top: 1rem;
}
</style>