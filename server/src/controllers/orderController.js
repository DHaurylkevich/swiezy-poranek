const orderService = require("../services/orderService");

exports.createOrder = async (req, res) => {
    try {
        const { clientName, email, phone, address, items, totalPrice } = req.body;

        const savedOrder = await orderService.createOrder(clientName, email, phone, address, items, totalPrice);
        res.status(201).send(savedOrder);
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: err.message });
    }
}

exports.getOrders = async (req, res) => {
    try {
        const orders = await orderService.getSortOrders();
        res.json(orders)
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: err.message });
    }
}
/*
exports.updateOrderById = async (req, res) => {
    const { clientName, email, phone, address, items, totalPrice } = req.body;
    const { id } = req.params;

    try{ 
        const updatedOrder = await orderService.updateOrderById(id, clientName, email, phone, address, items, totalPrice );
        if (!updatedOrder) {
            return res.status(404).send({ message: "Order not found" });
        }

        res.json(updatedOrder);
    }catch (err){
        console.error(err);
        res.status(500).json({ message: err.message });
    }
}
*/
