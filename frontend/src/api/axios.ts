import axios from 'axios';
import { tokenService } from '../services/tokenService';
import type { TokenResponse } from './types';

export const apiClient = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
    'ClientId': 'my-frontend-client'
  },
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = tokenService.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = tokenService.getRefreshToken();
        
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        const refreshResponse = await axios.post<TokenResponse>(
          'http://localhost:5000/auth/refresh',
          { refreshToken },
          { withCredentials: true }
        );

        tokenService.setTokens(refreshResponse.data);

        originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.access_token}`;
        return apiClient(originalRequest);
        
      } catch (refreshError) {
        console.warn('Session expired. Redirecting to login.');
        tokenService.clearTokens();
        window.location.href = '/login'; 
        return Promise.reject(refreshError);
      }
    }

    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);