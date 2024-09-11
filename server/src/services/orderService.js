const Order = require("../models/Order");

exports.createOrder = async (clientName, email, phone, address, items, totalPrice) => {
    const newOrder = new Order({
        clientName,
        email,
        phone,
        address,
        items,
        totalPrice
    });

    return await newOrder.save();
};

exports.updateOrderById = async (id, clientName, email, phone, address, items, totalPrice) => {
    return await Order.findByIdAndUpdate(
        id,
        {
            clientName,
            email,
            phone,
            address,
            items,
            totalPrice
        },
        { new: true }
    );
}

exports.getSortOrders = async () => {
    return Order.find()
}