const packageService = require("../services/packageService");

// Получение всех пакетов
exports.getAllPackages = async (req, res) => {
    try {
        const packages = await packageService.getAllPackage(req);
        res.status(200).json(packages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Получение пакета по ID
exports.getPackageById = async (req, res) => {
    try {
        const package = await packageService.getPackageById(req, req.params.id);
        if (!package) {
            return res.status(404).json({ error: 'Набор не найден' });
        }
        res.status(200).json(package);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Создание нового пакета
exports.createPackage = async (req, res) => {
    const { title, description, price, active } = req.body;
    const image = req.file ? `${req.file.filename}` : "vege.png";

    try {
        const createdPackage = await packageService.createPackage({ title, description, price, image, active });
        res.status(201).json({ message: "Package created", package: createdPackage });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Обновление пакета
exports.updatePackage = async (req, res) => {
    const { id } = req.params;
    const { title, description, price, active } = req.body;
    let { image } = req.body;

    if (!image && image !== "") {
        image = req.file ? `${req.file.filename}` : "vege.png";
    }

    try {
        const updatedPackage = await packageService.updatePackage(id, { title, description, price, image, active });
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
    try {
        const deletedPackage = await packageService.deletePackage(req.params.id);
        if (!deletedPackage) {
            return res.status(404).json({ error: 'Набор не найден' });
        }
        res.status(200).json({ message: 'Набор удален' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
