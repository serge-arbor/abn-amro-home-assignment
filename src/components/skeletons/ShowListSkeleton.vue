<script setup lang="ts">
import ShowListItemSkeleton from '@/components/skeletons/ShowListItemSkeleton.vue'
</script>

<template>
  <div class="space-y-4">
    <ShowListItemSkeleton v-for="i in 10" :key="i" />
  </div>
</template>
