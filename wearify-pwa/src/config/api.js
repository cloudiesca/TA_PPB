// import axios from 'axios';

// // Base URL
// const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://ta-ppb-eight.vercel.app/api';

// // Create Axios Instance
// const apiClient = axios.create({
//     baseURL: BASE_URL,
//     headers: {
//         "Content-Type": "application/json",
//     },
//     timeout: 10000,
// });

// // Request Log
// apiClient.interceptors.request.use(
//     (config) => {
//         console.log("API Request:", config.baseURL + config.url);
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

// // Response Handler
// apiClient.interceptors.response.use(
//     (response) => response.data, // langsung return data
//     (error) => {
//         const msg = error.response?.data?.message || error.message;
//         console.error("API Error:", msg);
//         return Promise.reject(error.response?.data || error);
//     }
// );

// export { apiClient, BASE_URL };

// src/config/api.js
import axios from 'axios';

// Determine base URL based on environment
const getBaseURL = () => {
    // 1. Cek .env terlebih dahulu
    if (import.meta.env.VITE_API_BASE_URL) {
        return import.meta.env.VITE_API_BASE_URL;
    }

    // 2. Production: pakai Vercel URL
    if (import.meta.env.PROD) {
        return 'https://ta-ppb-eight.vercel.app/api';
    }

    // 3. Development: localhost backend di port 5000 (bukan 3000!)
    return 'http://localhost:5000/api';
};

const BASE_URL = getBaseURL();

console.log('🌐 API Base URL:', BASE_URL);

// Create Axios Instance
const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
});

// Request Interceptor - Log semua request
apiClient.interceptors.request.use(
    (config) => {
        console.log("📤 API Request:", {
            method: config.method?.toUpperCase(),
            url: config.baseURL + config.url,
            fullURL: config.baseURL + config.url
        });
        return config;
    },
    (error) => {
        console.error("❌ Request Error:", error);
        return Promise.reject(error);
    }
);

// Response Interceptor - Handle response
apiClient.interceptors.response.use(
    (response) => {
        console.log("📥 API Response:", {
            url: response.config.url,
            status: response.status,
            data: response.data
        });

        // Return data langsung jika ada
        return response.data || response;
    },
    (error) => {
        const msg = error.response?.data?.message || error.message;
        console.error("❌ API Error:", {
            url: error.config?.url,
            status: error.response?.status,
            message: msg,
            fullError: error.response?.data
        });

        return Promise.reject(error.response?.data || error);
    }
);

export { apiClient, BASE_URL };