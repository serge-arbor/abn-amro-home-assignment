import { expect, test } from 'vitest'
import { ref } from 'vue'

import { useFilteredShows } from '@/composables/useFilteredShows'
import type { Show } from '@/entities/show.entity'

test('filters shows based on selected genres', () => {
  const showList = ref([
    { id: 1, genres: ['Action'], rating: { average: 8 } },
    { id: 2, genres: ['Drama'], rating: { average: 9 } }
  ] as Show[])
  const selectedGenres = ref(new Set(['Drama']))

  const { filteredShowList } = useFilteredShows(showList, selectedGenres)

  expect(filteredShowList.value).toEqual([{ id: 2, genres: ['Drama'], rating: { average: 9 } }])
})
