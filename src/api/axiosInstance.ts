import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const instance = axios.create({
  baseURL,
  timeout: 1000,
  withCredentials: true,
});

export default instance;
