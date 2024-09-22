const mongoose = require("mongoose");
const { Schema } = mongoose;

const dishSchema = new Schema({
    name: { type: String, required: true },
    calories: { type: Number },
});

const dayMenuSchema = new Schema({
    day: { type: String, required: true },
    type: { type: String, required: true },
    dishes: [dishSchema],
});

const menuSchema = new Schema({
    menus: [dayMenuSchema],
});

const Menu = mongoose.model("Menu", menuSchema);
module.exports = Menu;
