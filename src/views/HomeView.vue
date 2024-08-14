<script setup lang="ts">
import type { Ref } from 'vue'

import GenresFilter from '@/components/GenresFilter.vue'
import SearchBar from '@/components/SearchBar.vue'
import ShowList from '@/components/ShowList.vue'
import { useFilteredShows } from '@/composables/useFilteredShows'
import { useGenres } from '@/composables/useGenres'
import { useShowList } from '@/composables/useShowList'
import { useShowListFilters } from '@/composables/useShowListFilters'

const { selectedGenres, searchQuery } = useShowListFilters()

const { data: showList, error, isLoading } = useShowList(searchQuery as Ref<string>)

const { filteredShowList } = useFilteredShows(showList, selectedGenres)

const { genres } = useGenres(showList)
</script>

<template>
  <main class="p-4 flex flex-col gap-4 max-w-screen-lg mx-auto">
    <SearchBar v-model="searchQuery" />

    <GenresFilter v-model="selectedGenres" :genres="genres" :is-loading="isLoading" />

    <ShowList :data="filteredShowList" :error="error" :is-loading="isLoading" />
  </main>
</template>
