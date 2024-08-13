<script setup lang="ts">
import { computed } from 'vue'

import type { Genre } from '@/entities/show.entity'

const props = defineProps<{
  genres: Set<Genre>
  error: Error | null
  isLoading: boolean
}>()

const selectedGenres = defineModel({
  type: Set<Genre>,
  required: true
})

const toggleGenre = (genre: string) => {
  selectedGenres.value.has(genre)
    ? selectedGenres.value.delete(genre)
    : selectedGenres.value.add(genre)
}

const genreArray = computed(() => Array.from(props.genres))

const clearSelection = () => {
  selectedGenres.value.clear()
}
</script>

<template>
  <div class="space-y-2">
    <div class="flex flex-wrap gap-2">
      <button
        v-for="(genre, index) in genreArray"
        :key="index"
        class="px-4 py-2 rounded border"
        :class="[
          selectedGenres.has(genre)
            ? 'bg-blue-500 text-white'
            : 'bg-white text-blue-500 border-blue-500'
        ]"
        @click="toggleGenre(genre)"
      >
        {{ genre }}
      </button>

      <button
        v-if="selectedGenres.size > 0"
        class="px-4 py-2 rounded border bg-red-500 text-white"
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
    color 0.3s;
}
</style>
