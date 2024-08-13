import { useQuery } from '@tanstack/vue-query'
import { createSharedComposable } from '@vueuse/core'
import { computed, type Ref } from 'vue'

import { type Genre, type Show } from '@/entities/show.entity'
import { fetchShows } from '@/services/showService'

export function useShowIndex(activeGenres: Ref<Set<Genre>>) {
  const queryInstance = useQuery({
    queryKey: ['show-index'],
    queryFn: fetchShows,
    networkMode: 'offlineFirst'
  })

  const genres = computed<Set<Genre>>(() => {
    const shows = queryInstance.data.value ?? []
    const genres = new Set<Genre>()

    shows.forEach((show) => {
      show.genres.forEach((genre) => genres.add(genre))
    })

    return genres
  })

  const filteredShows = computed<Show[] | undefined>(() => {
    if (activeGenres.value.size === 0) {
      return queryInstance.data.value
    }

    return queryInstance.data.value?.filter((show) =>
      show.genres.some((genre) => activeGenres.value?.has(genre))
    )
  })

  return {
    ...queryInstance,
    genres,
    filteredShows
  }
}

export const useSharedShowIndex = createSharedComposable(useShowIndex)
