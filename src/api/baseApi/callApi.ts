import axios, { type AxiosInstance } from "axios";
import BASE_URL from "./baseUrl";
import tokenService from "./tokenService";
import getAccessTokenByOther from "./accessTokenByOther";

let isRefreshing = false;
let waitingRequests: Array<() => void> = [];

const callApi: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 8000,
    headers: { "Content-Type": "application/json" },
});

callApi.interceptors.request.use(
    (config) => {
        const accessToken = tokenService.getAccessToken();
        console.log(accessToken);

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => Promise.reject(error),
);

callApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        console.log(error.response?.status);

        const originalRequest = error.config;

        if (!originalRequest) {
            return Promise.reject(error);
        }

        if (error.response?.status !== 401) {
            return Promise.reject(error);
        }

        if (originalRequest._retry) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                waitingRequests.push(() => {
                    callApi(originalRequest).then(resolve).catch(reject);
                });
            });
        }

        isRefreshing = true;

        try {
            await getAccessTokenByOther();

            waitingRequests.forEach((callback) => callback());
            waitingRequests = [];

            return callApi(originalRequest);
        } catch (refreshError) {
            waitingRequests = [];
            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
    },
);

export default callApi;
