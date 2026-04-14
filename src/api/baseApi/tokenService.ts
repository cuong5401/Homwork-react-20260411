const tokenService = {
    accessKey: "access-token",
    refreshKey: "refresh-token",

    getAccessToken() {
        return localStorage.getItem(this.accessKey);
    },

    getRefreshToken() {
        return localStorage.getItem(this.refreshKey);
    },

    setToken({ accessToken = null, refreshToken = null }) {
        accessToken && localStorage.setItem(this.accessKey, accessToken);
        refreshToken && localStorage.setItem(this.refreshKey, refreshToken);
    },

    clearToken() {
        localStorage.removeItem(this.accessKey);
        localStorage.removeItem(this.refreshKey);
    },
};

export default tokenService;
