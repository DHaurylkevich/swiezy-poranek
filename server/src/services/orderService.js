const Order = require("../models/order");

exports.createOrder = async (orderData) => {
    try {
        console.log(orderData);
        const order = new Order(orderData);
        await order.save();
        return order;
    } catch (error) {
        throw new Error("Failed to save order: " + error.message);
    }
}

exports.getAllOrders = async () => {
    try {
        return await Order.find();
    } catch (error) {
        throw new Error("Failed to retrieve orders: " + error.message);
    }
}

exports.updateOrderStatus = async (id, status) => {
    try {
        return await Order.findByIdAndUpdate(id, { status: status.status });
    } catch (error) {
        throw new Error("Failed to retrieve orders: " + error.message);
    }
}

exports.getOrderById = async (orderId) => {
    try {
        const order = await Order.findById(orderId);
        if (!order) {
            throw new Error("Order not found");
        }
        return order;
    } catch (error) {
        throw new Error("Failed to retrieve order: " + error.message);
    }
}

exports.deleteOrderById = async (orderId) => {
    try {
        return await Order.findByIdAndDelete(orderId);
    } catch (error) {
        throw new Error("Failed to delete order: " + error.message);
    }
}
