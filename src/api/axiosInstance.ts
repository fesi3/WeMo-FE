import axios from 'axios';
import { API_PATHS } from '@/constants/apiPath';
import store from '@/redux/store';
import { logout } from '@/redux/authReducers';

const {
  AUTH: { REFRESH_TOKEN, SIGNOUT },
} = API_PATHS;

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const instance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// 무한 루프 예방 변수
let isRefreshing = false;
const logoutInitiatedKey = 'logoutInitiated';

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Case 1: 액세스 토큰 expired (401)
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return Promise.reject(error); // Prevent multiple refresh attempts
      }

      originalRequest._retry = true;
      isRefreshing = true; // 무한 루프 예방

      try {
        console.log('🔄 리프레시 토큰 요청 중...');
        await instance.post(REFRESH_TOKEN);
        console.log('✅ 리프레시 토큰 갱신 성공');
        isRefreshing = false;
        return instance(originalRequest); // 실패한 요청 재시도
      } catch (refreshError: unknown) {
        // console.error('❌ 리프레시 토큰 갱신 실패', error);

        if (!localStorage.getItem(logoutInitiatedKey)) {
          localStorage.setItem(logoutInitiatedKey, 'true'); // 플래그 설정

          // Case 2: 리프레시 토큰 만료 -> 로그아웃 처리
          try {
            await instance.post(SIGNOUT); // Attempt to sign out
            console.log('✅ SIGNOUT successful');
          } catch (signoutError: unknown) {
            console.warn(
              'SIGNOUT failed with error',
              signoutError.response?.status,
            );
          } finally {
            // Always execute this block, regardless of SIGNOUT success or failure
            store.dispatch(logout()); // Clear global user information
            alert('세션이 만료되었습니다. 다시 로그인 해주세요.');
            window.location.href = '/start';
          }
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
