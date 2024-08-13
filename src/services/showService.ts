import type { Show } from '@/entities/show.entity'

import apiClient from './apiClient'

export const fetchShows = async (): Promise<Show[]> => {
  return await apiClient.get('shows').json()
}

export const fetchShowDetails = async (id: string): Promise<Show> => {
  return await apiClient.get(`shows/${id}`).json()
}
