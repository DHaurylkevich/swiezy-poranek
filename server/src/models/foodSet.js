const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSetSchema = new Schema({
  name: { type: String, required: true, index: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  photo: { type: String },
  vegetarian: { type: Boolean, default: false },
  active: { type: Boolean, default: false }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model("FoodSet", foodSetSchema);
