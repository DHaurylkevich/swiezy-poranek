const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSetSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  photo: { type: String },
  vegetarian: { type: Boolean, default: false },
  active: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FoodSet', foodSetSchema);
