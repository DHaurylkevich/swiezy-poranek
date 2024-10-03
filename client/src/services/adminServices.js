const axios = require("axios");

const API_URL = VUE_APP_API_URL + "/admin";

export const loginAdmin = async (email, password) => {
    try {
        await axios.post(`${API_URL}/login`, { email, password }, { withCredentials: true });
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
        const response = await axios.get(`${VUE_APP_API_URL}/auth/check`, { withCredentials: true });
        return response.data.isAuthenticated;
    } catch (e) {
        if (e.response && e.response.data) {
            return false;
        } else {
            throw new Error('Network error');
        }
    }
};

export const logoutAdmin = async () => {
    try {
        await axios.post(`${API_URL}/logout`,{}, { withCredentials: true });
        return true;
    } catch (e) {
        if (e.response && e.response.data) {
            return false;
        } else {
            throw new Error('Network error');
        }
    }
}

export const refreshTokenAdmin = async () => {
    try {
        await axios.get(`${VUE_APP_API_URL}/auth/refresh`, { withCredentials: true });
        console.log("REFRESh");
        return true;
    } catch (e) {
        if (e.response && e.response.data) {
            return false;
        } else {
            throw new Error('Network error');
        }
    }
}
