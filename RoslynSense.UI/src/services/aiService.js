import { api } from "./api";

export const getProviders = async () => {

    const response = await api.get("/ai/providers");

    return response.data;
};

export const getModels = async (provider) => {

    const response = await api.get(`/ai/models/${provider}`);

    return response.data;
};