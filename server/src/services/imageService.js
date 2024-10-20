const Image = require("../models/Image");

exports.saveImage = async (title, url) => {
    const newImage = new Image({ 
        title, 
        url 
    });

    return await newImage.save();
}

exports.getImages = async () => {
    return await Image.find().lean()
}

exports.deleteImage = async (id) => {
    return await Image.findByIdAndDelete(id);
}