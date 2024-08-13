import { useQuery } from '@tanstack/vue-query'
import { computed, type Ref } from 'vue'

import { type GenreId, type Show } from '@/entities/show.entity'
import { fetchShows } from '@/services/showService'

export function useShowIndex(activeGenres: Ref<Set<GenreId>>) {
  const queryInstance = useQuery({
    queryKey: ['show-index'],
    queryFn: fetchShows,
    networkMode: 'offlineFirst'
  })

  const filteredShows = computed<Show[] | undefined>(() => {
    const shows = queryInstance.data.value || []

    const filtered =
      activeGenres.value.size > 0
        ? shows.filter((show) => show.genres.some((genre) => activeGenres.value.has(genre)))
        : shows

    return [...filtered].sort((a, b) => (b.rating?.average ?? 0) - (a.rating?.average ?? 0))
  })

  return {
    ...queryInstance,
    filteredShows
  }
}
