import axios from "axios";
import { BASE_URL } from "../config/config";

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000
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