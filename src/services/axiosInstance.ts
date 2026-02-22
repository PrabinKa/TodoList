import axios from "axios";

const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
    timeout: 5000
});

api.interceptors.request.use((config) => {
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log(error);

        return Promise.reject(error);
    }
);

export default api;