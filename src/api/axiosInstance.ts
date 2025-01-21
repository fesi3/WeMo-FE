import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const instance = axios.create({
  baseURL,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default instance;
