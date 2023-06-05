import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const { get, post } = instance;
