const imageService = require("../services/imageService");
const { deleteFromCloud } = require("../middleware/upload");

exports.getAllImages = async (req, res) => {
    try {
        const images = await imageService.getImages();

        res.status(200).json(images);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

exports.uploadImage = async (req, res) => {
    try {
        const title = req.body.title;
        if (req.file) {
            url = req.file.path;
        }

        const uploadedImage = await imageService.saveImage(title, url)

        res.status(200).json(uploadedImage);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

exports.deleteImage = async (req, res) => {
    const id = req.params.id;
    const { url } = req.body;


    try {
        const deletedImage = await imageService.deleteImage(id)
        if (!deletedImage) {
            return res.status(404).json({ error: "Фото не найдено" });
        }

        const deletedFromCloud = await deleteFromCloud(url);

        if (!deletedFromCloud) {
            return res.status(404).json({ error: "Фото не найден" });
        }

        res.status(200).json(deletedImage)
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}