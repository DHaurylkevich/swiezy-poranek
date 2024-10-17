import axios from "axios";

const API_URL = VUE_APP_API_URL + "/package";

// Функция для получения токена из localStorage
const getAuthToken = () => localStorage.getItem('authToken');

// Получение всех пакетов
export const getPackages = async () => {
    try {
        const token = getAuthToken();
        const response = await axios.get(API_URL, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (e) {
        console.error("Failed to fetch packages:", e);
        throw e;
    }
}

// Получение пакетов с меню
export const getPackagesWithMenu = async () => {
    try {
        const token = getAuthToken();
        const response = await axios.get(`${API_URL}/packages`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (e) {
        console.error("Failed to fetch packages:", e);
        throw e;
    }
}

// Создание нового пакета
export const createPackage = async (formData) => {
    try {
        const token = getAuthToken();
        await axios.post(`${API_URL}/create`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (e) {
        console.error("Ошибка при создании пакета:", e);
        throw new Error(e.response?.data?.message || "Ошибка на сервере");
    }
};

// Обновление пакета
export const updatePackage = async (id, formData) => {
    try {
        const token = getAuthToken();
        await axios.put(`${API_URL}/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (e) {
        console.error("Ошибка при обновлении пакета:", e);
        throw new Error(e.response?.data?.message || "Ошибка на сервере");
    };
};

// Удаление пакета
export const deletePackage = async (id, url) => {
    try {
        const token = getAuthToken();
        await axios.delete(`${API_URL}/${id}`, {
            data: { url: url },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (e) {
        console.error("Ошибка при удалении пакета:", e);
        throw new Error(e.response?.data?.message || "Ошибка на сервере");
    };
};
