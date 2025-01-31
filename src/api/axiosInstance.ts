import axios from 'axios';
import store from '@/redux/store';
import { logout, setUser } from '@/redux/authReducers';
import { PATHS } from '@/constants/apiPath';

const {
  AUTH: { REFRESH_TOKEN, USER_INFO },
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

// ✅ Interceptor: Automatically attach user data if available
instance.interceptors.request.use(
  async (config) => {
    try {
      const response = await instance.get(USER_INFO); // Fetch user info
      store.dispatch(setUser(response.data)); // Save user data to Redux
    } catch (error) {
      console.error(error);
      store.dispatch(logout()); // If fetching user fails, logout
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// ✅ Response Interceptor: Handle Expired Token & Refresh Automatically
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite loops

      try {
        await instance.post(REFRESH_TOKEN, {}, { withCredentials: true });

        return axios(originalRequest); // ✅ Retry Original Request
      } catch (refreshError) {
        store.dispatch(logout()); // ❌ If refresh fails, logout user
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
