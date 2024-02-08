<template>
  <div class="container">
    <RegisterForm />
    <RouterLink class="register-form" :to="{ name: 'login' }">
      Login
    </RouterLink>
  </div>
</template>

<script setup>
import RegisterForm from '../components/auth/register-form.vue';
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