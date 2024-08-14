<script setup lang="ts">
import { computed } from 'vue'

import type { GenreDetails, GenreId } from '@/entities/show.entity'

import GenresFilterSkeleton from './skeletons/GenresFilterSkeleton.vue'

const props = defineProps<{
  genres: Map<GenreId, GenreDetails>
  isLoading: boolean
}>()

const selectedGenres = defineModel({
  type: Set<GenreId>,
  required: true
})

const toggleGenre = (genre: GenreId) => {
  selectedGenres.value.has(genre)
    ? selectedGenres.value.delete(genre)
    : selectedGenres.value.add(genre)
}

const genreArray = computed(() => Array.from(props.genres.entries()))

const clearSelection = () => {
  selectedGenres.value.clear()
}
</script>

<template>
  <GenresFilterSkeleton v-if="isLoading" />

  <div v-else class="space-y-4">
    <div class="flex flex-wrap gap-2">
      <button
        v-for="([genreId, genreDetails], index) in genreArray"
        :key="index"
        class="px-3 py-1 rounded-md border font-semibold transition-all duration-300 ease-in-out text-xs"
        :class="[
          selectedGenres.has(genreId)
            ? 'bg-blue-600 text-white border-blue-600 shadow-md hover:bg-blue-700'
            : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-100'
        ]"
        @click="toggleGenre(genreId)"
      >
        {{ genreDetails.name }} ({{ genreDetails.count }})
      </button>

      <button
        v-if="selectedGenres.size > 0"
        class="px-3 py-1 rounded-md border font-semibold transition-all duration-300 ease-in-out bg-red-500 text-white hover:bg-red-600 shadow-md text-xs"
        @click="clearSelection"
      >
        Clear
      </button>
    </div>
  </div>
</template>

<style scoped lang="postcss">
button {
  transition:
    background-color 0.3s,
    color 0.3s,
    box-shadow 0.3s;
}

button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.6);
}

button:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
