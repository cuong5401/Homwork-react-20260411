import publicApi from "./publicApi";
import tokenService from "./tokenService";

const authApi = {
    async login(data: object) {
        try {
            const rest = await publicApi.post("auth/signin", data);
            console.log(rest.data);

            tokenService.setToken(rest.data);
        } catch (e) {
            console.log("tên đăng nhập hoặc mật khẩu không đúng!!!");
            console.log(e);
        }
    },

    async autoLogin() {
        const defaultAccount: object = {
            email: "lecaocuong@test.com",
            password: "12345678",
        };
        await this.login(defaultAccount);
    },

    logOut() {
        // ...
        console.log("logout");
        tokenService.clearToken();
    },
};

export default authApi;
