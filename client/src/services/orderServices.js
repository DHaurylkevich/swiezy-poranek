import axios from "axios";

const API_URL = VUE_APP_API_URL + "/order";

// Создание нового заказа
export const createOrder = async (orderData) => {
    try {
        console.log(orderData);
        const response = await axios.post(`${API_URL}/create`, orderData);
        return response.data;
    } catch (error) {
        console.error("Error creating order:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to create order');
    }
}

// Удаление заказа
export const deleteOrder = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting order:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to delete order');
    }
}

// Обновление существующего заказа
export const updateOrderStatus = async (id, orderData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, orderData);
        return response.data;
    } catch (error) {
        console.error("Error updating order:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to update order');
    }
}

// Получение всех заказов
export const getOrders = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching orders:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to fetch orders');
    }
}

// Получение заказа по ID
export const getOrderById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching order by ID:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to fetch order');
    }
}