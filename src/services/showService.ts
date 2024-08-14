import type { SearchResult, Show } from '@/entities/show.entity'

import apiClient from './apiClient'

export const fetchShows = async (): Promise<Show[]> => {
  return await apiClient.get('shows').json()
}

export const searchShows = async (query: string): Promise<SearchResult[]> => {
  return await apiClient.get('search/shows', { searchParams: { q: query } }).json()
}

export const fetchShowDetails = async (id: string): Promise<Show> => {
  return await apiClient.get(`shows/${id}`).json()
}
