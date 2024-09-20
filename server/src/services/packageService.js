const Package = require("../models/Package");

// Создание нового пакета
exports.createPackage = async (data) => {
    const package = new Package(data);
    return await package.save();
};

// Получение всех пакетов
exports.getAllPackage = async (req) => {
    const packages = await Package.find().lean(); 
    return packages;  
};

// Получение пакета по ID
exports.getPackageById = async (req, id) => {
    const package = await Package.findById(id).lean();
    return package;
};

// Обновление пакета
exports.updatePackage = async (id, data) => {
    const package = await Package.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    return package;
};

// Удаление пакета
exports.deletePackage = async (id) => {
    return await Package.findByIdAndDelete(id);
};
