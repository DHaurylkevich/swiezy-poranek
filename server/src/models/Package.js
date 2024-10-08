const mongoose = require('mongoose');
const { Schema } = mongoose;

const packageSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    require: true
  },
  menu: {
    type: Schema.Types.ObjectId,
    ref: "Menu",
    required: false
  }
});

const Package = mongoose.model('Package', packageSchema);
module.exports = Package;