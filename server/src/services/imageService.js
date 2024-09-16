const Image = require("../models/image");

exports.saveImage = async (title, url) => {
    const newImage = new Image({ 
        title, 
        url 
    });

    return await newImage.save();
}

exports.getImages = async (hostUrl) => {
    const images = await Image.find().lean()
    return createFullUrl(hostUrl, images);

}

exports.deleteImage = async (id) => {
    return await Image.findByIdAndDelete(id);
}

const createFullUrl = (hostUrl, images) => {
    if (!Array.isArray(images)) images = [images]; 

    const updatedImages = images.map(img => ({
        ...img,
        url: `${hostUrl}${img.url}`
    }));

    return updatedImages;
};