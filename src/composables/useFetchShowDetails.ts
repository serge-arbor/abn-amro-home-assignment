import { useQuery } from '@tanstack/vue-query'

import { fetchShowDetails } from '@/services/showService'

export function useFetchShowDetails(id: string) {
  return useQuery({
    queryKey: ['showDetails', id],
    queryFn: () => fetchShowDetails(id)
  })
}
