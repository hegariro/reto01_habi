<template>
  <nav aria-label="Page navigation">
    <ul class="pagination justify-content-end">
      <li v-for="(link, key) in links" :key="key" class="page-item" :class="(status(link))">
          <a class="page-link" @click="">
          {{ link.label }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps(['links']);
const links = computed(() => (props.links));

const status = (link) => {
  if (!!link?.active) return 'active';
  else if (!!link?.disabled) return 'disabled';
  return '';
};
</script>