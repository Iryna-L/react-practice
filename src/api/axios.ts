import axios from 'axios';

export const Api = axios.create({
  baseURL: 'https://api.realworld.io/api/',
});

Api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    const updatedConfig = { ...config };
    if (token) {
      updatedConfig.headers.Authorization = `Token ${token}`;
    }
    return updatedConfig;
  },
  (error) => {
    return Promise.reject(error);
  },
);
