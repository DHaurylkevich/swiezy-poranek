const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dishItemSchema = new Schema({
    name: String,
    type: String,
    day: String,
    index: String,
    calories: Number
});

const itemOrderSchema = new Schema({
    index: String,
    title: String,
    price: Number,
    type: String,
    dishes: [dishItemSchema],
    count: { type: Number, default: 1 }
})

const orderSchema = new Schema({
    fullName: {
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
    description: {
        type: String,
        require: false
    },
    email: {
        type: String,
        required: true
    },
    items: [itemOrderSchema],
    fullPrice: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true,
        default: "Nowe zamówienie"
    }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;