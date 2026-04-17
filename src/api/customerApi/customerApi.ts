import callApi from "../baseApi/callApi";
import type { CusTomer, CustomerFormData } from "../../units";

const customerApi = {
    async getAll(): Promise<CusTomer[]> {
        const res = await callApi.get("/customers");
        return res.data;
    },

    async getOneById(id: number | string): Promise<CusTomer> {
        const res = await callApi.get(`/customers/${id}`);
        return res.data;
    },

    async create(data: CustomerFormData): Promise<CusTomer> {
        const res = await callApi.post("/customers", data);
        return res.data;
    },

    async editById(id: number | string, data: CustomerFormData): Promise<CusTomer> {
        const res = await callApi.put(`/customers/${id}`, data);
        return res.data;
    },

    async deleteById(id: number | string): Promise<CusTomer> {
        const res = await callApi.delete(`/customers/${id}`);
        return res.data;
    },
};

export default customerApi;
