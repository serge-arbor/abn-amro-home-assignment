import { useQuery } from '@tanstack/vue-query'
import type { Ref } from 'vue'

import { fetchShowDetails } from '@/services/showService'

export function useFetchShowDetails(id: Ref<string>) {
  return useQuery({
    queryKey: ['showDetails', id],
    queryFn: () => fetchShowDetails(id.value)
  })
}
