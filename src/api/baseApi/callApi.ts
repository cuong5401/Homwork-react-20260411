import axios, { type AxiosInstance } from "axios";
import BASE_URL from "./baseUrl";
import tokenService from "./tokenService";
import getAccessTokenByOther from "./accessTokenByOther";

let isRefreshing = false;
let waitingRequests: Array<{
    resolve: () => void;
    reject: (error: unknown) => void;
}> = [];

const callApi: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 8000,
    headers: { "Content-Type": "application/json" },
});

callApi.interceptors.request.use(
    (config) => {
        const accessToken = tokenService.getAccessToken();
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
        const originalRequest = error.config;

        if (!originalRequest) {
            return Promise.reject(error);
        }

        if (error.response?.status !== 400 && error.response?.status !== 403) {
            return Promise.reject(error);
        }

        if (originalRequest._retry) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        // nếu đang chạy refresh thì nên lưu các request lại
        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                waitingRequests.push({
                    resolve: () => {
                        callApi(originalRequest).then(resolve).catch(reject);
                    },
                    reject,
                });
            });
        }

        isRefreshing = true;

        try {
            await getAccessTokenByOther();

            waitingRequests.forEach(({ resolve }) => resolve());
            waitingRequests = [];

            return callApi(originalRequest);
        } catch (refreshError) {
            waitingRequests.forEach(({ reject }) => reject(refreshError));
            waitingRequests = [];
            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
    },
);

export default callApi;
