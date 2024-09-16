const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const imageController = require("../controllers/imageController");

//Загрузка в базу данных изображения
router.post("/", upload.single("image"), imageController.uploadImage)

//Получение всех изображений
router.get("/", imageController.getAllImages);

//Удаление фото по id
router.delete("/:id", imageController.deleteImage)

module.exports = router;