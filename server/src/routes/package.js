const express = require('express');
const router = express.Router();
const packageController = require('../controllers/packageController');
const upload = require("../middleware/upload");

// const { authenticateJWT, authorizeAdmin } = require('../middleware/auth');

// Создание нового набора 
router.post('/create',  upload.single("image"), packageController.createPackage);

// Получение всех наборов
router.get('/', packageController.getAllPackages);

// Получение набора по ID
router.get('/:id', packageController.getPackageById);

// Обновление набора
router.put('/:id', upload.single('image'), packageController.updatePackage);

// Удаление набора
router.delete('/:id', packageController.deletePackage);

module.exports = router;
