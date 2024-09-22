import axios from "axios";

const API_URL = VUE_APP_API_URL + "/menu";

// Получение всех меню
export const getMenu = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (e) {
        console.error("Ошибка при получении меню:", e);
        throw e;
    }
}

// Создание нового меню
export const saveMenu = async (menuData) => {
    try {
        await axios.post(`${API_URL}/`, menuData);
    } catch (e) {
        console.error("Ошибка при создании меню:", e);
        throw new Error(e.response?.data?.message || "Ошибка на сервере");
    }
};


// Удаление меню
export const deleteMenu = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (e) {
        console.error("Ошибка при удалении меню:", e);
        throw new Error(e.response?.data?.message || "Ошибка на сервере");
    }
};