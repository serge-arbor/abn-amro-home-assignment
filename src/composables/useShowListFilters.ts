import { refWithControl } from '@vueuse/core'
import { type Ref, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import type { GenreId } from '@/entities/show.entity'

export function useShowListFilters() {
  const route = useRoute()
  const router = useRouter()

  const initialGenresValue = route.query.genres ? (route.query.genres as string).split(',') : []
  const selectedGenres = ref<Set<GenreId>>(new Set(initialGenresValue))

  const initialSearchQuery = route.query.q ?? ''
  const searchQuery = refWithControl(initialSearchQuery, {
    onChanged: () => {
      selectedGenres.value.clear()
    }
  })

  watch(
    [searchQuery, selectedGenres],
    ([newQuery, newGenres]) => {
      router.replace({
        query: {
          q: newQuery || undefined,
          genres: newGenres.size ? Array.from(newGenres).join(',') : undefined
        }
      })
    },
    { deep: true }
  )

  return {
    selectedGenres,
    searchQuery: searchQuery as Ref<string>
  }
}
