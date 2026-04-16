import callApi from "../baseApi/callApi";

const customerApi = {
    async getAll() {
        const res = await callApi.get("/customers");
        return res.data;
    },

    async getOneById(id: number | string) {
        const res = await callApi.get(`/customers/${id}`);
        return res.data;
    },

    async create(data) {
        const res = await callApi.post(`/customers`, data);
        return res.data;
    },

    async editById(id: number | string, data: any) {
        const res = await callApi.put(`/customers/${id}`, data);
        return res.data;
    },

    async deleteById(id: number | string) {
        const res = await callApi.delete(`/customers/${id}`);
        return res.data;
    },
};

export default customerApi;
