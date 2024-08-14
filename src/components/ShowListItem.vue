<script setup lang="ts">
import type { Show } from '@/entities/show.entity'

defineProps<{
  show: Show
}>()
</script>

<template>
  <div class="border rounded-lg shadow hover:shadow-lg transition-shadow">
    <RouterLink
      :to="{ name: 'show-details', params: { id: show.id } }"
      class="flex p-4 hover:bg-gray-100"
    >
      <img
        v-if="show.image?.medium"
        :src="show.image?.medium"
        :alt="show.name"
        class="w-24 h-36 object-cover rounded-md"
      />
      <div class="ml-4">
        <h3 class="text-lg font-semibold text-gray-800">
          {{ show.name }}
        </h3>
        <div class="text-sm text-gray-600 space-y-1">
          <p><strong>Language:</strong> {{ show.language }}</p>
          <p><strong>Premiered:</strong> {{ show.premiered }}</p>
          <p><strong>Genres:</strong> {{ show.genres.join(', ') }}</p>
          <p><strong>Rating:</strong> {{ show.rating.average || 'N/A' }}</p>
        </div>
      </div>
    </RouterLink>
  </div>
</template>
