const express = require("express");
const router = express.Router();
const uploadImages = require("../middleware/upload").uploadImages;
const imageController = require("../controllers/imageController");

//Загрузка в базу данных изображения
router.post("/", uploadImages.single("image"), imageController.uploadImage)

//Получение всех изображений
router.get("/", imageController.getAllImages);

//Удаление фото по id
router.delete("/:id", imageController.deleteImage)

module.exports = router;