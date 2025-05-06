import axios, { isAxiosError } from 'axios';
import { API_PATHS } from '@/shared/constants/apiPath';
import store from '@/shared/lib/redux/store';
import { logout } from '@/shared/lib/redux/authReducers';

const {
  AUTH: { REFRESH_TOKEN, SIGNOUT },
} = API_PATHS;

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// 무한 루프 예방 변수
let isRefreshing = false;

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Case 1: 액세스 토큰 expired (401)
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (window.location.pathname === '/start') {
        return Promise.reject(error); // /start 페이지에서는 실행하지 않음
      }
      if (isRefreshing) {
        return Promise.reject(error); // 중복 요청 방식
      }

      originalRequest._retry = true;
      isRefreshing = true; // 무한 루프 예방

      try {
        console.log('🔄 액세스 토큰 요청 중...');
        await axiosInstance.post(REFRESH_TOKEN);
        console.log('✅ 액세스 토큰 갱신 성공');
        isRefreshing = false;
        return axiosInstance(originalRequest); // 실패한 요청 재시도
      } catch (refreshError: unknown) {
        console.error('❌ 액세스 토큰 갱신 실패', error);

        // Case 2: 리프레시 토큰 만료 -> 로그아웃 처리
        try {
          await axiosInstance.post(SIGNOUT); // 서버에 로그아웃 요청
          console.log('✅ SIGNOUT successful');
        } catch (signoutError: unknown) {
          if (isAxiosError(signoutError)) {
            console.error(
              'SIGNOUT failed with error',
              signoutError.response?.status,
            );
          } else {
            console.error('SIGNOUT failed with unknown error', signoutError);
          }
        } finally {
          store.dispatch(logout()); // 유저 정보 초기화
          alert('세션이 만료되었습니다. 다시 로그인 해주세요.');
          window.location.href = '/start';
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
