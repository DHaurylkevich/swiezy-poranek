import axios from "axios";

const API_URL = VUE_APP_API_URL + "/package";

export const getPackages = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    }catch(e){
        console.error("Failed to fetch packages:", e);
        throw e;
    }
}
export const createPackage = async (formData) => {
    try {
        await axios.post(`${API_URL}/create`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    } catch (e) {
        console.error("Ошибка при создании пакета:", e);
        throw new Error(e.response?.data?.message || "Ошибка на сервере");
    }
};

export const updatePackage = async (id, formData) => {
    try {
        await axios.put(`${API_URL}/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    } catch (e) {
        console.error("Ошибка при обновлении пакета:", e);
        throw new Error(e.response?.data?.message || "Ошибка на сервере");
    }
};

export const deletePackage = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (e) {
        throw new Error(e.response?.data?.message || "Ошибка на сервере");
    }
}