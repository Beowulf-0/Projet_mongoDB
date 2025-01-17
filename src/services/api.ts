import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token aux requêtes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const register = async (data: { email: string; password: string; name: string }) => {
  const response = await api.post('/auth/register', data);
  return response.data;
};

// Offers
export const getOffers = async (params?: {
  type?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
}) => {
  const response = await api.get('/offers', { params });
  return response.data;
};

export const getOffer = async (id: string) => {
  const response = await api.get(`/offers/${id}`);
  return response.data;
};

// Reservations
export const createReservation = async (data: {
  offerId: string;
  startDate: string;
  endDate: string;
}) => {
  const response = await api.post('/reservations', data);
  return response.data;
};

export const getUserReservations = async () => {
  const response = await api.get('/reservations/user');
  return response.data;
};