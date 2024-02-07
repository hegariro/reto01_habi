<template>
</template>

<script setup>
import { useAuthStore } from '@/store/auth/auth.store';
import { router } from '@/routes';

const authStore = useAuthStore();
!authStore.isUserLoggedIn() && router.push({ name: 'login' });
</script>