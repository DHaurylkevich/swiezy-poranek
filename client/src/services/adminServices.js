import axios from 'axios';

const API_URL = "http://localhost:3000/api/admin";

export const loginAdmin = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            email,
            password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const token = response.data.token;
        // localStorage.setItem('token', token);

        return token;
    } catch (e) {
        // Проверка и возврат ошибок
        if (e.response && e.response.data) {
            throw new Error(e.response.data.message || 'Login failed');
        } else {
            throw new Error('Network error');
        }
    }
}