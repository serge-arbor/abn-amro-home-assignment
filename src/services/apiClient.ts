import ky from 'ky';

const apiClient = ky.create({
  prefixUrl: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

export default apiClient;
