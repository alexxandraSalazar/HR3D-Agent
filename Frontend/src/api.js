import axios from 'axios';
import { ACCESS_TOKEN } from './token';

const apiUrl = '/choreo-apis/awbo/backend/rest-api-be2/v1.0';
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiUrl,
});

// Request interceptor to add access token to headers
api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem(ACCESS_TOKEN);
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        const googleAccesToken = localStorage.getItem('GOOGLE_ACCESS_TOKEN');
        if (googleAccesToken) {
            config.headers["X-Google-Access-Token"] = googleAccesToken;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);

export default api;