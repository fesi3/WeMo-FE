import { PATHS } from '@/constants/apiPath';
import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const instance = axios.create({
  baseURL,
  timeout: 3000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const isTokenExpired = (token: string) => {
  if (token.startsWith('Bearer ')) {
    token = token.slice(7);
  }
  const [, payload] = token.split('.');

  const base64Decode = (splittedString: string) => {
    return decodeURIComponent(
      atob(splittedString.replace(/-/g, '+').replace(/_/g, '/'))
        .split('')
        .map((c) => `%${c.charCodeAt(0).toString(16).padStart(2, '0')}`)
        .join(''),
    );
  };

  const decodedPayload = JSON.parse(base64Decode(payload));
  const expirationTime = decodedPayload.exp * 1000;
  const currentTime = Date.now();

  return currentTime >= expirationTime;
};

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
