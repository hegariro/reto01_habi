<template>
</template>

<script setup>
import { useAuthStore } from '../../stores/auth/auth.store';
import { router } from '../../router';

const authStore = useAuthStore();
!authStore.isUserLoggedIn && router.push({ name: 'login' });
</script>