const mongoose = require("mongoose");
const fs = require('fs');
const path = require('path');
const Schema = mongoose.Schema;

const packageSchema = new Schema({
  title: { type: String, required: true, index: true },
  image: { type: String },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  active: { type: Boolean, default: false }
}, {
  versionKey: false
});

packageSchema.post('findOneAndDelete', function (doc) {
  if (doc.image && doc.image !== "" && doc.image.split('/').pop() !== "vege.png") {
    const imagePath = path.join(__dirname, '../../uploads', doc.image.split('/').pop());

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
      console.log("Delete", imagePath);
    }
  }
});

module.exports = mongoose.model("Package", packageSchema);