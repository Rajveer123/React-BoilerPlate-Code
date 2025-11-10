import axios from 'axios';
import type { AxiosError, InternalAxiosRequestConfig } from 'axios';

import env from '@config/env';
import logger from '@lib/logger';

interface ApiError {
  status: number | null;
  message: string;
  data: unknown;
}

const axiosInstance = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Attach auth token if available
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Add other custom headers if needed
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    // Global error handling
    if (error.response) {
      const { status, data } = error.response;
      // Example: Redirect to login on 401
      if (status === 401) {
        window.location.href = '/login';
      }
      // Example: Show error message for 403/500
      if (status === 403 || status === 500) {
        // You can use a toast/snackbar here
        logger.error(data?.message || 'Server error', error);
      }
      // Return a consistent error object
      const apiError: ApiError = {
        status,
        message: data?.message || 'API Error',
        data,
      };
      return Promise.reject(apiError);
    } else {
      // Network error or no response
      const apiError: ApiError = {
        status: null,
        message: 'Network error',
        data: null,
      };
      logger.error(apiError.message, error);
      return Promise.reject(apiError);
    }
  }
);

export default axiosInstance;
