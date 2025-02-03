import axios from 'axios';
import { PATHS } from '@/constants/apiPath';
// import store from '@/redux/store';
// import { logout } from '@/redux/authReducers';

const {
  AUTH: { REFRESH_TOKEN },
} = PATHS;

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
        await instance.post(REFRESH_TOKEN);
        isRefreshing = false;
        return instance(originalRequest); // 실패한 요청 재시도
      } catch (error) {
        console.log(error.response?.data.message);

        // Case 2: 리프레시 토큰 만료 -> 로그아웃 처리
        // await instance.post(SIGNOUT);
        // alert('세션이 만료되었습니다.');
        // store.dispatch(logout()); // ✅ 전역객체에도 유저 정보 초기화
        // window.location.href = '/start';
        // return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
