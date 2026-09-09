import axios from 'axios';

export const apiClient = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
        'ClientId': 'my-frontend-client'
    },
    withCredentials: true,
    
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
)