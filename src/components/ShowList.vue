<script setup lang="ts">
import ShowListItem from '@/components/ShowListItem.vue'
import ShowListSkeleton from '@/components/skeletons/ShowListSkeleton.vue'
import { type Show } from '@/entities/show.entity'

defineProps<{
  data: Show[] | undefined
  error: Error | null
  isLoading: boolean
}>()
</script>

<template>
  <div>
    <ShowListSkeleton v-if="isLoading" class="text-center text-gray-500" />

    <div v-else-if="error" class="text-center text-red-500">Error: {{ error.message }}</div>

    <ul v-else-if="data?.length" class="space-y-4">
      <ShowListItem v-for="show in data" :key="show.id" :show="show" />
    </ul>

    <p v-else class="text-center">No results</p>
  </div>
</template>
