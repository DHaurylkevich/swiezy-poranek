const axios = require("axios");
require("dotenv").config();

const API_URL = process.env.VUE_APP_API_URL + "/image";

export const saveImage = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    } catch (e) {
        throw new Error(e.response?.data?.message || "Ошибка на сервере");
    }
}

export const getImages = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (e) {
        throw new Error(e.response?.data?.message || "Ошибка на сервере");
    }
}

export const deleteImage = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (e) {
        throw new Error(e.response?.data?.message || "Ошибка на сервере");
    }
}
