<script setup lang="ts">
import { ref } from 'vue'

import FilterSidebar from '@/components/FilterSidebar.vue'
import ShowList from '@/components/ShowList.vue'
import { useShowIndex } from '@/composables/useShowIndex'
import type { Genre } from '@/entities/show.entity'

const selectedGenres = ref<Set<Genre>>(new Set())

const { filteredShows, genres, error, isLoading } = useShowIndex(selectedGenres)
</script>

<template>
  <main class="p-4 flex flex-col gap-4">
    <FilterSidebar
      v-model="selectedGenres"
      :error="error"
      :is-loading="isLoading"
      :genres="genres"
    />

    <ShowList :data="filteredShows" :error="error" :is-loading="isLoading" />
  </main>
</template>
