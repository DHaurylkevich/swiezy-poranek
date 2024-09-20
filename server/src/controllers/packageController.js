const cloudinary = require("../config/cloudinary");
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
    let imageUrl = "vege.png"; // Значение по умолчанию

    try {
        // Если файл изображения загружен
        if (req.file) {
            const uploadResult = await cloudinary.uploader.upload(req.file.path, {
                folder: 'packages'
            });

            imageUrl = uploadResult.secure_url; // Ссылка на загруженное изображение

            // Пример трансформации: автоформат и автокачество
            const optimizedImage = cloudinary.url(uploadResult.public_id, {
                fetch_format: 'auto',
                quality: 'auto'
            });

            console.log("Optimized Image URL:", optimizedImage);

            // Пример автообрезки
            const autoCroppedImage = cloudinary.url(uploadResult.public_id, {
                crop: 'auto',
                gravity: 'auto',
                width: 500,
                height: 500
            });

            console.log("Auto-cropped Image URL:", autoCroppedImage);
        }

        const createdPackage = await packageService.createPackage({ title, description, price, image: imageUrl, active });
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

    try {
        // Если новое изображение загружается
        if (req.file) {
            const uploadResult = await cloudinary.uploader.upload(req.file.path, {
                folder: 'packages',
                public_id: `package_${id}`
            });
            image = uploadResult.secure_url;

            // Пример трансформации: автоформат и автокачество
            const optimizedImage = cloudinary.url(uploadResult.public_id, {
                fetch_format: 'auto',
                quality: 'auto'
            });

            console.log("Optimized Image URL:", optimizedImage);

            // Пример автообрезки
            const autoCroppedImage = cloudinary.url(uploadResult.public_id, {
                crop: 'auto',
                gravity: 'auto',
                width: 500,
                height: 500
            });

            console.log("Auto-cropped Image URL:", autoCroppedImage);
        }

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
