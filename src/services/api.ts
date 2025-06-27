import axios from 'axios';

/**
 * Базовый инстанс для всех запросов.
 * URL без /api в конце: эндпоинты уже включают его (/api/orders, /api/incomes …)
 */
const api = axios.create({
    baseURL: 'http://109.73.206.144:6969',
    params: {
        key: import.meta.env.VITE_API_KEY,
    },
});

/* Ловим ошибки для удобства */
api.interceptors.request.use((config) => {
    config.params = {
        ...(config.params || {}),
        key: import.meta.env.VITE_API_KEY,
    };
    return config;
});

export default api;
