import { computed, type Ref } from 'vue'

import { type GenreDetails, type GenreId, type Show } from '@/entities/show.entity'

export function useGenres(showList: Ref<Show[] | undefined>) {
  const genres = computed<Map<GenreId, GenreDetails>>(() => {
    const genreMap = new Map<GenreId, GenreDetails>()

    for (const show of showList.value ?? []) {
      for (const genreName of show.genres) {
        const genreId = genreName as GenreId

        if (!genreMap.has(genreId)) {
          genreMap.set(genreId, {
            id: genreId,
            name: genreName,
            count: 1
          })
        } else {
          genreMap.get(genreId)!.count += 1
        }
      }
    }

    // Sort the genreMap by occurrences (count)
    const sortedGenres = new Map(
      Array.from(genreMap.entries()).sort((a, b) => b[1].count - a[1].count)
    )

    return sortedGenres
  })

  return {
    genres
  }
}
