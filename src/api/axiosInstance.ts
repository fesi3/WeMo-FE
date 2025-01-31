import axios from 'axios';
import { PATHS } from '@/constants/apiPath';

const {
  AUTH: { REFRESH_TOKEN },
} = PATHS;

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const instance = axios.create({
  baseURL,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// ✅ Response Interceptor: Handle Expired Token & Refresh Automatically
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // ✅ Refresh Token API Call (Cookies automatically included)
        await axios.post(REFRESH_TOKEN, {}, { withCredentials: true });

        // ✅ Retry Original Request
        return axios(originalRequest);
      } catch (refreshError) {
        // dispatch(logout()); // If refresh fails, logout the user
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
