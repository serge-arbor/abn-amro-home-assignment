import { QueryClient, type UseQueryReturnType, VueQueryPlugin } from '@tanstack/vue-query'
import { flushPromises, mount } from '@vue/test-utils'
import { beforeEach, expect, test, vi } from 'vitest'
import { ref } from 'vue'

import { createMockShow } from '@/__tests__/fixtures/mockShow'
import { useShowList } from '@/composables/useShowList'
import { fetchShows, searchShows } from '@/services/showService'

vi.mock('@/services/showService', () => ({
  fetchShows: vi.fn(),
  searchShows: vi.fn()
}))

beforeEach(() => {
  vi.resetAllMocks()
})

function createWrapperComponent(searchQuery: string) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false // Disable retries to avoid unexpected behavior in tests
      }
    }
  })

  const TestComponent = {
    template: '<div></div>',
    setup() {
      const queryResult = useShowList(ref(searchQuery))
      return { queryResult }
    }
  }

  return mount(TestComponent, {
    global: {
      plugins: [[VueQueryPlugin, { queryClient }]]
    }
  })
}

test('returns shows that match the search query', async () => {
  const mockShow = createMockShow({ name: 'Funny Show' })
  const mockSearchShows = vi.mocked(searchShows)
  mockSearchShows.mockResolvedValue([{ show: mockShow, score: 1 }])

  const wrapper = createWrapperComponent('comedy')

  await flushPromises()

  const result = wrapper.vm.queryResult as UseQueryReturnType<typeof useShowList, unknown>

  expect(mockSearchShows).toHaveBeenCalledWith('comedy')
  expect(result.data.value).toEqual([mockShow])
})

test('fetches all shows when search query is empty', async () => {
  const mockShow = createMockShow({ name: 'Serious Show' })
  const mockFetchShows = vi.mocked(fetchShows)
  mockFetchShows.mockResolvedValue([mockShow])

  const wrapper = createWrapperComponent('')

  await flushPromises()

  const result = wrapper.vm.queryResult as UseQueryReturnType<typeof useShowList, unknown>

  expect(mockFetchShows).toHaveBeenCalled()
  expect(result.data.value).toEqual([mockShow])
})

test('handles empty search results', async () => {
  const mockSearchShows = vi.mocked(searchShows)
  mockSearchShows.mockResolvedValue([])

  const wrapper = createWrapperComponent('nonexistent show')

  await flushPromises()

  const result = wrapper.vm.queryResult as UseQueryReturnType<typeof useShowList, unknown>

  expect(mockSearchShows).toHaveBeenCalledWith('nonexistent show')
  expect(result.data.value).toEqual([])
})

test('handles API errors gracefully', async () => {
  const mockSearchShows = vi.mocked(searchShows)
  const mockError = new Error('Network Error')
  mockSearchShows.mockRejectedValue(mockError)

  const wrapper = createWrapperComponent('comedy')

  await flushPromises()

  const result = wrapper.vm.queryResult as UseQueryReturnType<typeof useShowList, unknown>

  expect(mockSearchShows).toHaveBeenCalledWith('comedy')
  expect(result.isError.value).toBe(true)
  expect(result.error.value).toEqual(mockError)
})

test('handles null or undefined search query', async () => {
  const mockShow = createMockShow({ name: 'Default Show' })
  const mockFetchShows = vi.mocked(fetchShows)
  mockFetchShows.mockResolvedValue([mockShow])

  const wrapper = createWrapperComponent(undefined as unknown as string)

  await flushPromises()

  const result = wrapper.vm.queryResult as UseQueryReturnType<typeof useShowList, unknown>

  expect(mockFetchShows).toHaveBeenCalled()
  expect(result.data.value).toEqual([mockShow])
})

test('handles special characters in search query', async () => {
  const mockShow = createMockShow({ name: 'Funny Show with Special Char #!' })
  const mockSearchShows = vi.mocked(searchShows)
  mockSearchShows.mockResolvedValue([{ show: mockShow, score: 1 }])

  const wrapper = createWrapperComponent('#!comedy')

  await flushPromises()

  const result = wrapper.vm.queryResult as UseQueryReturnType<typeof useShowList, unknown>

  expect(mockSearchShows).toHaveBeenCalledWith('#!comedy')
  expect(result.data.value).toEqual([mockShow])
})

test('handles multiple concurrent queries', async () => {
  const mockShow1 = createMockShow({ name: 'Comedy Show' })
  const mockShow2 = createMockShow({ name: 'Drama Show' })

  const mockSearchShows = vi.mocked(searchShows)
  mockSearchShows
    .mockResolvedValueOnce([{ show: mockShow1, score: 1 }])
    .mockResolvedValueOnce([{ show: mockShow2, score: 1 }])

  const wrapper1 = createWrapperComponent('comedy')
  const wrapper2 = createWrapperComponent('drama')

  await flushPromises()

  const result1 = wrapper1.vm.queryResult as UseQueryReturnType<typeof useShowList, unknown>
  const result2 = wrapper2.vm.queryResult as UseQueryReturnType<typeof useShowList, unknown>

  expect(result1.data.value).toEqual([mockShow1])
  expect(result2.data.value).toEqual([mockShow2])
})
