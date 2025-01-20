import { PATHS } from '@/constants/apiPath';
import { isTokenExpired } from '@/utils/isTokenExpired';
import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const instance = axios.create({
  baseURL,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('accessToken');
  if (!token) return config;
  if (isTokenExpired(token)) {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}${PATHS.AUTH.REISSUE_TOKEN}`,
      '',
      {
        withCredentials: true,
      },
    );
    const newToken = response.headers['authorization'];
    config.headers.Authorization = `${newToken}`;
    localStorage.setItem('accessToken', newToken);
  } else {
    config.headers.Authorization = `${token}`;
  }

  return config;
});

export default instance;
