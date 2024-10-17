import axios from "axios";

const API_URL = VUE_APP_API_URL + "/menu";

const getAuthToken = () => {
    return localStorage.getItem('authToken');
};

export const getMenu = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (e) {
        console.error("Ошибка при получении меню:", e);
        throw e;
    }
}

export const getMenusIds = async () => {
    try {
        const response = await axios.get(`${API_URL}/ids`);
        return response.data;
    } catch (e) {
        console.error("Ошибка при получении меню:", e);
        throw e;
    }
}

export const saveMenu = async (menuData) => {
    try {
        const token = getAuthToken();
        await axios.post(`${API_URL}/`, menuData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (e) {
        console.error("Ошибка при создании меню:", e);
        throw new Error(e.response?.data?.message || "Ошибка на сервере");
    }
};

export const updatedDayMenu = async (id, dayMenuData) => {
    try {
        const token = getAuthToken();
        await axios.put(`${API_URL}/${id}`, dayMenuData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (e) {
        console.error("Ошибка при обновлении меню дня:", e);
        throw new Error(e.response?.data?.message || "Ошибка на сервере");
    }
};

export const deleteMenu = async (id) => {
    try {
        const token = getAuthToken();
        await axios.delete(`${API_URL}/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (e) {
        console.error("Ошибка при удалении меню:", e);
        throw new Error(e.response?.data?.message || "Ошибка на сервере");
    }
};
