import axios from 'axios';


const baseURL = import.meta.env.DEV
    ? 'http://109.73.206.144:6969'   // npm run dev
    : '/wb-api';                     // build / Vercel

const api = axios.create({
    baseURL,
    params: { key: import.meta.env.VITE_API_KEY },
});

api.interceptors.request.use((config) => {
    config.params = {
        ...(config.params ?? {}),
        key: import.meta.env.VITE_API_KEY,
    };
    return config;
});

export default api;
