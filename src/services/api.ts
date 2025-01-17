import axios from 'axios';

const API_URL = 'http://localhost/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const testApi = async () => {
  try {
    const response = await api.get('/test');
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};