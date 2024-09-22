import axios from "axios";

const API_URL = VUE_APP_API_URL + "/package";

// Получение всех пакетов
export const getPackages = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (e) {
        console.error("Failed to fetch packages:", e);
        throw e;
    }
}

// Создание нового пакета
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

// Обновление пакета
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

// Удаление пакета
export const deletePackage = async (id, url) => {
    try {
        await axios.delete(`${API_URL}/${id}`, { data: { url } });
    } catch (e) {
        console.error("Ошибка при удалении пакета:", e);
        throw new Error(e.response?.data?.message || "Ошибка на сервере");
    }
};