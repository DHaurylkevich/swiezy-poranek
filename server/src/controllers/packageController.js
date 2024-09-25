const packageService = require("../services/packageService");
const { deleteFromCloud } = require("../middleware/upload");

// Получение всех пакетов
exports.getAllPackagesWithoutAllMenu = async (req, res) => {
    try {
        const packages = await packageService.getAllPackagesWithoutAllMenu();
        res.status(200).json(packages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAllPackages = async (req, res) => {
    try{
        const packages = await packageService.getAllPackages();
        res.status(200).json(packages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Получение пакета по ID
exports.getPackageById = async (req, res) => {
    try {
        const package = await packageService.getPackageById(req.params.id);
        if (!package) {
            return res.status(404).json({ error: 'Набор не найден' });
        }
        res.status(200).json(package);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Создание нового пакета с загрузкой изображения в Cloudinary
exports.createPackage = async (req, res) => {
    const { title, description, price, active, type, menu } = req.body;
    let url = "https://res.cloudinary.com/da3vwohmo/image/upload/v1726819829/packages/standard.png";

    if (req.file) {
        url = req.file.path;
    }

    try {
        const createdPackage = await packageService.createPackage({ title, description, price, url, active, type, menu});
        res.status(201).json({ message: "Пакет создан", package: createdPackage });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Обновление пакета с возможной заменой изображения
exports.updatePackage = async (req, res) => {
    const { id } = req.params;
    const { title, description, price, active, type, menu } = req.body;
    let url = req.body.url;

    if (req.file) {
        const deletedFromCloud = await deleteFromCloud(url);

        if (!deletedFromCloud) {
            return res.status(404).json({ error: "Фото не найдено" });
        }

        url = req.file.path;
    }

    try {
        const updatedPackage = await packageService.updatePackage(id, { title, description, price, url, active, type, menu });
        if (!updatedPackage) {
            return res.status(404).json({ error: 'Набор не найден' });
        }
        res.status(200).json(updatedPackage);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Удаление пакета
exports.deletePackage = async (req, res) => {
    const { id } = req.params;
    const { url } = req.body;

    try {
        const deletedPackage = await packageService.deletePackage(id);
        if (!deletedPackage) {
            return res.status(404).json({ error: "Набор не найден" });
        }
        if (url) {
            const deletedFromCloud = await deleteFromCloud(url);
            if (!deletedFromCloud) {
                return res.status(404).json({ error: "Фото не найдено" });
            }
        }

        res.status(200).json({ message: "Набор удален" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};