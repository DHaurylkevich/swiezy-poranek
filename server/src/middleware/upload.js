const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { extractPublicId } = require("cloudinary-build-url");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storagePackages = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "packages",
        allowedFormats: ["jpeg", "png", "jpg"],
    },
});

const storageImages = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "images",
        allowedFormats: ["jpeg", "png", "jpg"],
    },
});

exports.deleteFromCloud = async (url) => {
    try {
        const publicId = extractPublicId(url);
        if (publicId !== "standard") {
            const result = await cloudinary.uploader.destroy(publicId);
            console.log(result)
        }
        return publicId;
    } catch (error) {
        console.error("Error deleting image:", error);
        throw error;
    }
};


exports.uploadPackages = multer({ storage: storagePackages });
exports.uploadImages = multer({ storage: storageImages });