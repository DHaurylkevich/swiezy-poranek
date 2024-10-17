// adminServices.js

const axios = require("axios");

const API_URL = VUE_APP_API_URL + "/admin";

// Вход в систему
export const loginAdmin = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });

        // Сохраняем токен в localStorage
        localStorage.setItem('token', response.data.token);
    } catch (e) {
        if (e.response && e.response.data) {
            throw new Error(e.response.data.message || 'Login failed');
        } else {
            throw new Error('Network error');
        }
    }
}

// Проверка аутентификации
export const checkAuth = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${VUE_APP_API_URL}/auth/check`, {
            headers: {
                'Authorization': `Bearer ${token}` // Передаем токен в заголовке
            }
        });

        return response.data.isAuthenticated;
    } catch (e) {
        return false;
    }
}

// Выход из системы
export const logoutAdmin = () => {
    localStorage.removeItem('token');
    return true;
}

// Обновление токена
export const refreshTokenAdmin = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${VUE_APP_API_URL}/auth/refresh`, {
            headers: {
                'Authorization': `Bearer ${token}` // Передаем старый токен
            }
        });

        // Сохраняем новый токен в localStorage
        localStorage.setItem('token', response.data.token);

        return true;
    } catch (e) {
        return false;
    }
}
