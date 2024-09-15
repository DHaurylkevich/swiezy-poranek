import axios from "axios";

const API_URL = "http://localhost:4242/api/orders";

export const createOrder = async (orderData) => {
    const response = await axios.post(`${API_URL}/create`, orderData);
    return response.data;
}

export const deleteOrder = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
}

export const updateOrder = async (id, orderData) => {
    const response = await axios.put(`${API_URL}/${id}`, orderData);
    return response.data;
}

export const getOrder = async () => {
    const response = await axios.get(API_URL);
    return response.data;
}