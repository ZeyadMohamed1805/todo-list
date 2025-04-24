import axios from 'axios';
import { getLocalStorageItem } from './LocalStorage.service';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${getLocalStorageItem("token")}`,
    }
});

export default api;
