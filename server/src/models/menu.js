const mongoose = require("mongoose");
const { Schema } = mongoose;

const dishSchema = new Schema({
    name: { type: String, required: true },
    calories: { type: Number },
});

const mealtimeSchema = new Schema({
    type: { type: String, required: true },
    dishes: [dishSchema],
});

const dayMenuSchema = new Schema({
    day: { type: String, required: true },
    mealtime: [mealtimeSchema],
});

const menuSchema = new Schema({
    position: { type: Number, unique: true },
    menus: [dayMenuSchema],
});

menuSchema.pre('save', async function (next) {
    const count = await Menu.countDocuments();
    this.position = count + 1;
    next();
});

const Menu = mongoose.model("Menu", menuSchema);
module.exports = Menu;