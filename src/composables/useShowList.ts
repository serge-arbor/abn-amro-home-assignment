import { useQuery } from '@tanstack/vue-query'
import { type Ref } from 'vue'

import { fetchShows, searchShows } from '@/services/showService'

export function useShowList(searchQuery: Ref<string | undefined>) {
  return useQuery({
    queryKey: ['show-list', searchQuery],
    queryFn: async () => {
      if (searchQuery.value != null && searchQuery.value.length > 0) {
        return (await searchShows(searchQuery.value)).map((result) => result.show)
      }

      return fetchShows()
    },
    networkMode: 'offlineFirst',
    placeholderData: (previousData) => previousData
  })
}
