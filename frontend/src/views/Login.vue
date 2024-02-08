<template>
  <div class="container">
    <LoginForm />
    <RouterLink class="register-form" :to="{ name: 'register' }">
      Quiero registrarme
    </RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import LoginForm from '@/components/auth/login-form.vue';
</script>

<style scoped>
.container {
  display: flexbox;
  flex-direction: column;
  padding-left: 2rem;
}
.register-form {
  display: block;
  margin-top: 1rem;
}
</style>