import apiClient from './apiClient';

export const fetchShows = async () => {
  return await apiClient.get('shows').json();
};

export const fetchShowDetails = async (id: string) => {
  return await apiClient.get(`shows/${id}`).json();
};
