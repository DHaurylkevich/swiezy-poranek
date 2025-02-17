const Package = require("../models/Package");

exports.createPackage = async (data) => {
    const newPackage = new Package(data);
    return await newPackage.save();
};

exports.getAllPackagesWithoutAllMenu = async () => {
    const packages = await Package.find().populate({
        path: "menu",
        select: "_id position"
    }).lean();
    return packages;
};

exports.getAllPackages = async () => {
    const packages = await Package.find().populate("menu").lean();
    return packages;
};

exports.getPackageById = async (id) => {
    const package = await Package.findById(id).lean();
    return package;
};

exports.updatePackage = async (id, data) => {
    const updatedPackage = await Package.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    return updatedPackage;
};

exports.deletePackage = async (id) => {
    return await Package.findByIdAndDelete(id);
};