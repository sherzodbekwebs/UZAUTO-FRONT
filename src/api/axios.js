import axios from 'axios';

// 🚀 URLni o'zgaruvchiga olamiz va eksport qilamiz
export const API_URL = import.meta.env.VITE_API_URL;

const API = axios.create({
    baseURL: API_URL,
    timeout: 10000,
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;