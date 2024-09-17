const Image = require("../models/Image");

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

const createFullUrl = (hostUrl, packages) => {
    const isSingle = !Array.isArray(packages);
    const updatedPackages = (isSingle ? [packages] : packages).map(pkg => ({
        ...pkg,
        image: `${hostUrl}${pkg.image}`
    }));
    return isSingle ? updatedPackages[0] : updatedPackages;
};
