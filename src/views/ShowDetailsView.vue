<script setup lang="ts">
import ShowDetails from '@/components/ShowDetails.vue';
defineProps<{
  id: string;
}>();
</script>
<template>
  <ShowDetails :id="id" />
</template>
