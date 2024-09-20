const express = require('express');
const router = express.Router();
const packageController = require('../controllers/packageController');
const uploadPackages = require("../middleware/upload").uploadPackages;

// const { authenticateJWT, authorizeAdmin } = require('../middleware/auth');

// Создание нового набора 
router.post('/create',  uploadPackages.single("image"), packageController.createPackage);

// Получение всех наборов
router.get('/', packageController.getAllPackages);

// Получение набора по ID
router.get('/:id', packageController.getPackageById);

// Обновление набора
router.put('/:id', uploadPackages.single("image"), packageController.updatePackage);

// Удаление набора
router.delete('/:id', packageController.deletePackage);

module.exports = router;
