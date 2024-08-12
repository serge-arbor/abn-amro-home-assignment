import { fetchShows } from "@/services/showService";
import { useQuery } from "@tanstack/vue-query";

export function useFetchShows() {
  return useQuery({
    queryKey: ['shows'],
    queryFn: fetchShows,
    networkMode: "offlineFirst",
  });
}