const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");

const imageSchema = new mongoose.Schema(
    {
        title: { type: String, require: true },
        url: { type: String, require: true },
    }, {
    timestamps: true,
}
);

imageSchema.post("findOneAndDelete", function (doc) {
    if (doc.url && doc.url !== "") {
        const imagePath = path.join(__dirname, "../../uploads", doc.url.split("/").pop());

        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
            console.log("Delete", imagePath);
        }
    }
});

module.exports = mongoose.model("Image", imageSchema);