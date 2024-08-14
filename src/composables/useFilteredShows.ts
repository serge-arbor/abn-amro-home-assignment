import { computed, type Ref } from 'vue'

import { type GenreId, type Show } from '@/entities/show.entity'

export function useFilteredShows(
  showList: Ref<Show[] | undefined>,
  activeGenres: Ref<Set<GenreId>>
) {
  const filteredShowList = computed<Show[] | undefined>(() => {
    const shows = showList.value ?? []

    const filtered =
      activeGenres.value.size > 0
        ? shows.filter((show) => show.genres.some((genre) => activeGenres.value.has(genre)))
        : shows

    return [...filtered].sort((a, b) => (b.rating?.average ?? 0) - (a.rating?.average ?? 0))
  })

  return {
    filteredShowList
  }
}
