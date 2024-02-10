<template>
  <nav aria-label="Page navigation">
    <ul class="pagination justify-content-end">
      <li v-for="(link, key) in links" :key="key" 
        class="page-item" :class="validateButton(link)"
      >
        <a class="page-link" @click="changePage(key)">
          {{ link.label }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useTaskStore } from '../../stores/task/task.store';

const props = defineProps(['links']);
const links = computed(() => (props.links?.links || []));
const validateButton = (link) => (link.disabled ? 'disabled' : (link.active ? 'active': ''));
const changePage = (idx) => {
  const taskStore = useTaskStore();
  const label = taskStore.getLinks.links[idx].label;
  taskStore.setAllTasks(label)
};
</script>