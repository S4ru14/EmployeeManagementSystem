import axios from 'axios';
import { logout } from './authService';
import { message } from 'antd';

const api = axios.create({
  baseURL: 'http://localhost:5027/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      logout();
      window.location.href = '/login';
      message.error('Session expired. Please login again.');
    }

    return Promise.reject(error);
  }
);

export default api;
