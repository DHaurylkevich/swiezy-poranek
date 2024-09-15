const imageService = require("../services/imageService");


exports.getAllImages = async (req, res) => {
    try {
        const url = `${req.protocol}://${req.get('host')}/uploads/`;
        const images = await imageService.getImages(url);
        
        res.status(200).json(images);
    }catch(e){
        res.status(500).json({ message: e.message });
    }
}

exports.uploadImage = async (req, res) => {
    try{
        const title = req.body.title;
        const url = `${req.file.filename}`;

        const uploadedImage = await imageService.saveImage(title, url)

        res.status(200).json(uploadedImage);
    }catch(e){
        res.status(500).json({message: e.message});
    }
}

exports.deleteImage = async (req, res) => {
    try{
        const deletedImage = await imageService.deleteImage(req.params.id)
        if (!deletedImage) {
            return res.status(404).json({ error: "Фото не найдено" });
        }
        res.status(200).json(deletedImage)
    }catch(e){
        res.status(500).json({ message : e.message });
    }
}