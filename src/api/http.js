import axios from "axios";

const origin = "http://localhost:3001";

const axiosInstance = axios.create({
    baseURL: origin,
    timeout: 1000,
});

export default axiosInstance;
