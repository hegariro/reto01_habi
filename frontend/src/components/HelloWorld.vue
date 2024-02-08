<script setup>
import { useAuthStore } from '@/stores/auth/auth.store';
defineProps({
  msg: {
    type: String,
    required: true
  }
})
const authStore = useAuthStore();
const { isUserLoggedIn } = authStore;
</script>

<template>
  <nav class="navbar navbar-dark bg-dark">
    <a class="navbar-brand" style="color: var(--color-text)">{{ msg }}</a>
    <div v-show="isUserLoggedIn">
      <form class="form-inline">
        <input class="form-control mr-sm-2" type="search" 
          placeholder="Search" aria-label="Search"
        />
        <button type="button" class="btn btn-outline-success my-2 my-sm-0">
          Search
        </button>
      </form>
    </div>
  </nav>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
