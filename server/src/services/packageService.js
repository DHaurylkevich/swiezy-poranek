const Package = require("../models/Package");
const path = require("path");
const fs = require("fs");

exports.createPackage = async (data) => {
    const package = new Package(data);
    return await package.save();
};

exports.getAllPackage = async () => {
    return await Package.find();
};

exports.getPackageById = async (id) => {
    return await Package.findById(id);
};

exports.updatePackage = async (id, data) => {
    const package = await Package.findById(id);
    if (!package) throw new Error("Пакет не найден");


    if (package.image && package.image !== data.image && package.image.split('/').pop() !== "vege.png" && data.image.split('/').pop() !== "vege.png") {
        const oldImagePath = path.join(__dirname, '../../uploads', package.image.split('/').pop());
        if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
        }
    }

    return await Package.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

exports.deletePackage = async (id) => {
    return await Package.findByIdAndDelete(id);
};