import axios from 'axios';
import { PATHS } from '@/constants/apiPath';
import store from '@/redux/store';
import { logout } from '@/redux/authReducers';

const {
  AUTH: { REFRESH_TOKEN, SIGNOUT },
} = PATHS;
const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const instance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 액세스 토큰 기간 만료
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await instance.post(REFRESH_TOKEN);
        return instance(originalRequest); // 실패한 요청 재시도
      } catch (error) {
        // Case 2: 리프레시 토큰 만료
        await instance.post(SIGNOUT);
        alert('세션이 만료되었습니다.');
        store.dispatch(logout()); // ✅ Clear user from Redux
        window.location.href = '/start';
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
