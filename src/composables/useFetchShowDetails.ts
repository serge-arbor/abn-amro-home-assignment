import { fetchShowDetails } from "@/services/showService";
import { useQuery } from "@tanstack/vue-query";

export function useFetchShowDetails(id: string) {
  return useQuery({
    queryKey: ['showDetails', id],
    queryFn: () => fetchShowDetails(id),
  });
}