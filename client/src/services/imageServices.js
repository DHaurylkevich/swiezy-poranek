const axios = require("axios");

const API_URL = VUE_APP_API_URL + "/image";

export const saveImage = async (formData) => {
    try {
        const token = localStorage.getItem('authToken');

        const response = await axios.post(`${API_URL}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            }
        });

        return response.data;
    } catch (e) {
        throw new Error(e.response?.data?.message || "Ошибка на сервере");
    }
}

export const getImages = async () => {
    try {
        const token = localStorage.getItem('authToken');

        const response = await axios.get(API_URL, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        return response.data;
    } catch (e) {
        throw new Error(e.response?.data?.message || "Ошибка на сервере");
    }
}

export const deleteImage = async (id, url) => {
    try {
        const token = localStorage.getItem('authToken');

        await axios.delete(`${API_URL}/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            },
            data: { url }
        });
    } catch (e) {
        throw new Error(e.response?.data?.message || "Ошибка на сервере");
    }
}
