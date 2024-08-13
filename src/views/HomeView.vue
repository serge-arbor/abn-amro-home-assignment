<script setup lang="ts">
import { ref } from 'vue'

import FilterSidebar from '@/components/FilterSidebar.vue'
import ShowList from '@/components/ShowList.vue'
import { useGenres } from '@/composables/useGenres'
import { useShowIndex } from '@/composables/useShowIndex'
import type { GenreId } from '@/entities/show.entity'

const selectedGenres = ref<Set<GenreId>>(new Set())

const { filteredShows, error, isLoading } = useShowIndex(selectedGenres)
const { genres, error: genresError, isLoading: isLoadingGenres } = useGenres()
</script>

<template>
  <main class="p-4 flex flex-col gap-4">
    <FilterSidebar
      v-model="selectedGenres"
      :error="genresError"
      :is-loading="isLoadingGenres"
      :genres="genres"
    />

    <ShowList :data="filteredShows" :error="error" :is-loading="isLoading" />
  </main>
</template>
