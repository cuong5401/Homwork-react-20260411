import callApi from "../baseApi/callApi";

const customerApi = {
    async getAll() {
        const res = await callApi.get("/products");
        return res.data;
    },

    async getOneById(id: number | string) {
        const res = await callApi.get(`products/${id}`);
        return res.data;
    },

    async editById(id: number | string, data: any) {
        const res = await callApi.put(`products/${id}`, data);
        return res.data;
    },

    async deleteById(id: number | string) {
        const res = await callApi.delete(`products/${id}`);
        return res.data;
    },
};

export default customerApi;
