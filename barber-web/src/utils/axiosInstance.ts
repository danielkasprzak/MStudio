import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://localhost:7190',
    withCredentials: true
});

export default axiosInstance;