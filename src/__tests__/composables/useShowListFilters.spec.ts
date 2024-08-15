import { flushPromises } from '@vue/test-utils'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { type RouteLocationNormalizedLoaded, type Router, useRoute, useRouter } from 'vue-router'

import { useShowListFilters } from '@/composables/useShowListFilters'

// Mocking vue-router's useRoute and useRouter
vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
  useRouter: vi.fn()
}))

describe('useShowListFilters', () => {
  let mockRoute: Partial<ReturnType<typeof useRoute>>
  let mockRouter: Partial<Router>

  beforeEach(() => {
    vi.clearAllMocks()

    mockRoute = {
      query: {}
    }
    vi.mocked(useRoute).mockReturnValue(mockRoute as RouteLocationNormalizedLoaded)

    mockRouter = {
      replace: vi.fn()
    }
    vi.mocked(useRouter).mockReturnValue(mockRouter as Router)
  })

  test('initializes selectedGenres and searchQuery from route query', () => {
    // Setting up initial route query
    mockRoute.query = {
      genres: 'action,comedy',
      q: 'funny'
    }

    const { selectedGenres, searchQuery } = useShowListFilters()

    expect(Array.from(selectedGenres.value)).toEqual(['action', 'comedy'])
    expect(searchQuery.value).toBe('funny')
  })

  test('clears selectedGenres when searchQuery changes', async () => {
    // Setting up initial route query
    mockRoute.query = {
      genres: 'action,comedy',
      q: 'funny'
    }

    const { selectedGenres, searchQuery } = useShowListFilters()

    // Simulate changing the searchQuery
    searchQuery.value = 'serious'
    await flushPromises()

    expect(selectedGenres.value.size).toBe(0)
  })

  test('updates route query when selectedGenres changes', async () => {
    const { selectedGenres } = useShowListFilters()

    // Simulate adding a genre
    selectedGenres.value.add('drama')
    await flushPromises()

    expect(mockRouter.replace).toHaveBeenCalledWith({
      query: {
        genres: 'drama',
        q: undefined
      }
    })
  })

  test('updates route query when searchQuery changes', async () => {
    const { searchQuery } = useShowListFilters()

    // Simulate changing the searchQuery
    searchQuery.value = 'thriller'
    await flushPromises()

    expect(mockRouter.replace).toHaveBeenCalledWith({
      query: {
        q: 'thriller',
        genres: undefined
      }
    })
  })

  test('handles empty query parameters', () => {
    const { selectedGenres, searchQuery } = useShowListFilters()

    expect(selectedGenres.value.size).toBe(0)
    expect(searchQuery.value).toBe('')
  })
})
