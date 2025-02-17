import axios from "axios";

const API_URL = VUE_APP_API_URL + "/order";

const getAuthToken = () => localStorage.getItem('token');

export const createOrder = async (orderData) => {
    try {
        console.log(orderData);
        const token = getAuthToken();
        const response = await axios.post(`${API_URL}/create`, orderData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error creating order:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to create order');
    }
}

export const deleteOrder = async (id) => {
    try {
        const token = getAuthToken();
        const response = await axios.delete(`${API_URL}/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting order:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to delete order');
    }
}

export const updateOrderStatus = async (id, orderData) => {
    try {
        const token = getAuthToken();
        const response = await axios.put(`${API_URL}/${id}`, orderData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error updating order:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to update order');
    }
}

export const getOrders = async () => {
    try {
        const token = getAuthToken();
        const response = await axios.get(API_URL, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching orders:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to fetch orders');
    }
}

export const getOrderById = async (id) => {
    try {
        const token = getAuthToken();
        const response = await axios.get(`${API_URL}/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching order by ID:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to fetch order');
    }
}
