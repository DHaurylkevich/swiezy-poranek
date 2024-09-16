const Package = require("../models/Package");
const path = require("path");
const fs = require("fs");

// Создание нового пакета
exports.createPackage = async (data) => {
    const package = new Package(data);
    return await package.save();
};

// Получение всех пакетов
exports.getAllPackage = async (req) => {
    const hostUrl = `${req.protocol}://${req.get('host')}/uploads/`;
    const packages = await Package.find().lean(); 
    return createFullUrl(hostUrl, packages);
};

// Получение пакета по ID
exports.getPackageById = async (req, id) => {
    const hostUrl = `${req.protocol}://${req.get('host')}/uploads/`;
    const package = await Package.findById(id).lean();
    return createFullUrl(hostUrl, package);
};

// Обновление пакета
exports.updatePackage = async (id, data) => {
    const package = await Package.findById(id);
    if (!package) throw new Error("Пакет не найден");

    if (package.image && package.image !== data.image && package.image !== "vege.png" && data.image !== "vege.png") {
        const oldImagePath = path.join(__dirname, '../../uploads', package.image);
        if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
        }
    }

    return await Package.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

// Удаление пакета
exports.deletePackage = async (id) => {
    return await Package.findByIdAndDelete(id);
};

// Функция для добавления полного URL к изображениям
const createFullUrl = (hostUrl, packages) => {
    if (!Array.isArray(packages)) packages = [packages]; 

    const updatedPackages = packages.map(pkg => ({
        ...pkg,
        image: `${hostUrl}${pkg.image}`
    }));

    return updatedPackages;
};
