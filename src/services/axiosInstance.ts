import axios from 'axios';
import { BASE_URL } from '../config/config';
import { logout, SecureStorage } from '../utils';
import { STORAGE_KEY } from '../constants/keys';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let failedQueue: any[] = [];

// Retry multiple failed api requests with new access token
const processQueue = (error: any, token: string | null = null) => {
  if (failedQueue) {
    failedQueue.forEach(prom => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });

    failedQueue = [];
  }
};

// Get new access token using refresh token when access token expires
const getNewAccessToken = async () => {
  const refreshTokenFromStorage = await SecureStorage.getItem(
    STORAGE_KEY.REFRESH_TOKEN,
  );

  if (!refreshTokenFromStorage) {
    return null;
  }

  try {
    const response = await api.post(`auth/refresh`, {
      refreshToken: refreshTokenFromStorage,
    });

    return response.data.accessToken;
  } catch (error) {
    processQueue(error, null);

    throw error;
  }
};

// Request interceptor injecting token and common headers
api.interceptors.request.use(
  async config => {
    const accessTokenFromStorage = await SecureStorage.getItem(
      STORAGE_KEY.ACCESS_TOKEN,
    );

    if (accessTokenFromStorage) {
      config.headers.Authorization = `Bearer ${accessTokenFromStorage}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

// Response interceptor handler 401 unauthorized status
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;

            return api(originalRequest);
          })
          .catch(error => {
            throw error;
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newAccessToken = await getNewAccessToken();

        if (!newAccessToken) {
          throw new Error('Refresh token expired');
        }

        await SecureStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, newAccessToken);

        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);

        await logout();

        throw error;
      } finally {
        isRefreshing = false;
      }
    }

    throw error;
  },
);

export default api;
