const express = require("express");
const router = express.Router();
const { authenticateJWT } = require("../middleware/auth");
const uploadImages = require("../middleware/upload").uploadImages;
const imageController = require("../controllers/imageController");

//Загрузка в базу данных изображения
router.post("/", authenticateJWT, uploadImages.single("image"), imageController.uploadImage)

//Получение всех изображений
router.get("/", imageController.getAllImages);

//Удаление фото по id
router.delete("/:id", authenticateJWT, imageController.deleteImage)

module.exports = router;