<script setup lang="ts">
import { refWithControl } from '@vueuse/core'
import { ref } from 'vue'

import GenresFilter from '@/components/GenresFilter.vue'
import SearchBar from '@/components/SearchBar.vue'
import ShowList from '@/components/ShowList.vue'
import { useFilteredShows } from '@/composables/useFilteredShows'
import { useGenres } from '@/composables/useGenres'
import { useShowList } from '@/composables/useShowList'
import type { GenreId } from '@/entities/show.entity'

const selectedGenres = ref<Set<GenreId>>(new Set())
const searchQuery = refWithControl('', {
  onChanged: () => {
    selectedGenres.value.clear()
  }
})
const { data: showList, error, isLoading } = useShowList(searchQuery)
const { data: filteredShowList } = useFilteredShows(showList, selectedGenres)
const { genres } = useGenres(showList)
</script>

<template>
  <main class="p-4 flex flex-col gap-4">
    <SearchBar v-model="searchQuery" />

    <GenresFilter v-model="selectedGenres" :genres="genres" />

    <ShowList :data="filteredShowList" :error="error" :is-loading="isLoading" />
  </main>
</template>
