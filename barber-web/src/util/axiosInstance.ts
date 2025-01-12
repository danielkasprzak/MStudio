import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://localhost:7190',
    withCredentials: true
});

axiosInstance.interceptors.response.use((config) => {
    const csrfToken = document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN'))?.split('=')[1];
    if (csrfToken) {
        config.headers['X-XSRF-TOKEN'] = csrfToken;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;