const orderService = require('../services/orderService');

exports.createOrder = async (req, res) => {
    try {
        const { orderData, basketItems } = req.body;
        orderData.items = basketItems;

        console.log('Order data before saving:', JSON.stringify(orderData, null, 2));

        const newOrder = await orderService.createOrder(orderData);

        return res.status(201).json(newOrder);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders();
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.getOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await orderService.getOrderById(orderId);
        return res.status(200).json(order);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.updateOrderStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const status = req.body;
        const order = await orderService.updateOrderStatus(id, status);
        return res.status(200).json(order);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.deleteOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        const deletedOrder = await orderService.deleteOrderById(orderId);

        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        return res.status(200).json({ message: 'Order successfully deleted' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
