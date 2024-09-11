const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  facebook: String,
  instagram: String,
  phone: String,
  email: String,
  address: String,
  openingHours: String
});

module.exports =  mongoose.model('Contact', contactSchema);