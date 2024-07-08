const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    clientName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    item: [
        {
            name:{ type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }
        }
    ],
    totalPrice: {
        type: Number,
        required: true,
        min: [0, 'Общая стоимость не может быть отрицательной']
    },
    orderDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Order", OrderSchema);