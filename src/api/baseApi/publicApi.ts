import axios, { type AxiosInstance } from "axios";
import BASE_URL from "./baseUrl";

const publicApi: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 8000,
    headers: { "Content-Type": "application/json" },
});

export default publicApi;
