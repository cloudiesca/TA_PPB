import axios from 'axios';

// Base URL
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://ta-ppb-eight.vercel.app/api';

// Create Axios Instance
const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
});

// Request Log
apiClient.interceptors.request.use(
    (config) => {
        console.log("API Request:", config.baseURL + config.url);
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Handler
apiClient.interceptors.response.use(
    (response) => response.data, // langsung return data
    (error) => {
        const msg = error.response?.data?.message || error.message;
        console.error("API Error:", msg);
        return Promise.reject(error.response?.data || error);
    }
);

export { apiClient, BASE_URL };
