import axios from 'axios';

// Base URL dari environment variable
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// Create axios instance
const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 seconds
});

// Request interceptor
apiClient.interceptors.request.use(
    (config) => {
        // Bisa tambah token auth di sini kalau perlu
        // const token = localStorage.getItem('token');
        // if (token) {
        //   config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
apiClient.interceptors.response.use(
    (response) => {
        // Return data directly if success
        return response.data;
    },
    (error) => {
        // Handle error responses
        const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
        console.error('API Error:', errorMessage);
        return Promise.reject(error.response?.data || error);
    }
);

export { apiClient, BASE_URL };