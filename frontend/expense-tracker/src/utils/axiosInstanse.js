import axios from 'axios';
import { BASE_URL } from './apiPaths';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 25000, // 10 seconds timeout
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Add a request interceptor to include the token in headers    

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('token');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//Response Interceptor

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
       if(error.response){
        if(error.response.status === 401) {
            window.location.href = '/login'; // Redirect to login page
        }else if(error.response.status === 403) {
            alert("You do not have permission to access this resource.");
       }else if(error.response.status === 500) {
            alert("Internal server error. Please try again later.");
        }}else if(error.code === 'ECONNABORTED') {
            alert("Request timed out. Please check your internet connection and try again.");
        }
        return Promise.reject(error);
    
}
);

export default axiosInstance;