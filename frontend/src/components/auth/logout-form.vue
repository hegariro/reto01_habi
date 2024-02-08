
import { errorMessages } from 'vue/compiler-sfc';
<template>
  <div class="card text-dark bg-warning mb-3" style="max-width: 18rem;">
    <div class="card-header">Cierre de sesi&oacute;n</div>
    <div class="card-body">
      <h5 class="card-title">Est&aacute;s a punto de cerrar sesi&oacute;n</h5>
      <p class="card-text">
        Al cerrar sesi&oacute;n ser&aacute;s redigirigid@ al formulario de inicio de sesi&oacute;n.
      </p>
      <p>
        <button type="button" @click="logout" class="btn btn-secondary">Cerrar sesi&oacute;n</button>
      </p>
    </div>
  </div>
</template>

<script setup>
import { router } from '../../router';
import { useAuthStore } from '../../stores/auth/auth.store';

const logout = async () => {
  let page = 'all-tasks';
  const authStore = useAuthStore();
  try {
    await authStore.logout();
    if (!authStore?.isUserLoggedIn) page = 'login'
  } catch (err) {
    console.error(err);
  } finally {
    // TODO Agregar notificación
    router.push({ name: page });
  }
};
</script>

<style scoped></style>