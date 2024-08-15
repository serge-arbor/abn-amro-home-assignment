import { expect, test } from 'vitest'
import { ref } from 'vue'

import { useGenres } from '@/composables/useGenres'
import type { Show } from '@/entities/show.entity'

test('computes genres and sorts them by count', () => {
  const showList = ref([
    { genres: ['Action', 'Drama'] },
    { genres: ['Action'] },
    { genres: ['Comedy', 'Drama'] }
  ] as Show[])

  const { genres } = useGenres(showList)

  const genreArray = Array.from(genres.value.entries())
  expect(genreArray[0][0]).toBe('Action')
  expect(genreArray[0][1].count).toBe(2)
  expect(genreArray[1][0]).toBe('Drama')
  expect(genreArray[1][1].count).toBe(2)
})
