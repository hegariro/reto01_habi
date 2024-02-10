<template>
  <div class="card text-white bg-dark mb-2 mx-5" style="width: 22rem;">
    <div class="card-header">
      <h4>{{ user.name }}</h4>
    </div>
    <div class="card-body">
      <h5 class="card-title">{{ user.email }}</h5>
      <p class="card-text">miembro desde {{ user.created_at }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps(['user']);
const user = computed(() => (props.user));
</script>

<style scoped>
h5 {
  color: aliceblue;
}
</style>