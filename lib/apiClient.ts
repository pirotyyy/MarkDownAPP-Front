import { API_URL } from '@/config';
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});
