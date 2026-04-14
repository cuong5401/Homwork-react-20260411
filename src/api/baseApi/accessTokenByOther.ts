import publicApi from "./publicApi";
import tokenService from "./tokenService";
import authApi from "./authApi";

// lấy access token bằng refresh token hoặc tự động log in cho lẹ
async function getAccessTokenByOther() {
    const refreshToken = tokenService.getRefreshToken();

    if (!refreshToken) {
        await authApi.autoLogin();
    } else {
        try {
            const newToken = await publicApi.post("auth/refresh-token", refreshToken);
            tokenService.setToken(newToken.data);
        } catch {
            return authApi.autoLogin();
        }
    }
}

export default getAccessTokenByOther;
