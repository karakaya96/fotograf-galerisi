import axios from 'axios';

const apiKey = process.env.REACT_APP_UNSPLASH_KEY;
const apiClient = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: { Authorization: `Client-ID ${apiKey}` },
});

export const fetchPhotos = async (perPage = 12) => {
  const response = await apiClient.get('/photos', { params: { per_page: perPage } });
  return response.data;
};

export const fetchPhotosByCategory = async (category, perPage = 12) => {
  const response = await apiClient.get('/search/photos', { params: { query: category, per_page: perPage } });
  return response.data.results;
};

export const fetchPhotoById = async (id) => {
  const response = await apiClient.get(`/photos/${id}`);
  return response.data;
};
