import { API_PATHS } from '@/constants/apiPath';
import axios, { AxiosHeaders } from 'axios';

export const ssrInstance = (cookie?: string) => {
  const headers: AxiosHeaders = cookie
    ? new axios.AxiosHeaders({ Cookie: cookie })
    : new axios.AxiosHeaders();

  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    withCredentials: true,
    headers: headers,
  });

  let isRefreshing = false;
  let refreshPromise: Promise<string> | null = null;

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && originalRequest) {
        if (isRefreshing) {
          return refreshPromise!.then((newCookie) => {
            originalRequest.headers = {
              ...originalRequest.headers,
              Cookie: newCookie,
            };
            return instance(originalRequest);
          });
        }

        isRefreshing = true;
        refreshPromise = axios
          .post(
            `${process.env.NEXT_PUBLIC_BASE_URL}${API_PATHS.AUTH.REFRESH_TOKEN}`,
            {},
            { headers: headers, withCredentials: true },
          )
          .then((response) => {
            const newCookie = response.headers['set-cookie'];
            if (!newCookie) throw new Error('새 쿠키를 받지 못함');

            const updatedCookie = Array.isArray(newCookie)
              ? newCookie.join('; ')
              : newCookie;

            return updatedCookie;
          })
          .catch((err) => {
            console.error('토큰 재발급 실패', err);
            throw err;
          })
          .finally(() => {
            isRefreshing = false;
            refreshPromise = null;
          });

        return refreshPromise.then((newCookie) => {
          originalRequest.headers = {
            ...originalRequest.headers,
            Cookie: newCookie,
          };
          return instance(originalRequest);
        });
      }

      return Promise.reject(error);
    },
  );

  return instance;
};
