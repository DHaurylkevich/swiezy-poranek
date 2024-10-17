const axios = require("axios");

const API_URL = VUE_APP_API_URL + "/admin";

export const loginAdmin = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });

        localStorage.setItem('token', response.data.token);
    } catch (e) {
        if (e.response && e.response.data) {
            throw new Error(e.response.data.message || 'Login failed');
        } else {
            throw new Error('Network error');
        }
    }
}

export const checkAuth = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${VUE_APP_API_URL}/auth/check`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response.data.isAuthenticated;
    } catch (e) {
        return false;
    }
}

export const logoutAdmin = () => {
    localStorage.removeItem('token');
    return true;
}

export const refreshTokenAdmin = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${VUE_APP_API_URL}/auth/refresh`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        localStorage.setItem('token', response.data.token);

        return true;
    } catch (e) {
        return false;
    }
}
