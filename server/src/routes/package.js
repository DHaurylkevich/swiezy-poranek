const express = require('express');
const router = express.Router();
const { authenticateJWT } = require("../middleware/auth");
const packageController = require('../controllers/packageController');
const uploadPackages = require("../middleware/upload").uploadPackages;

// Создание нового набора 
router.post('/create',authenticateJWT,  uploadPackages.single("image"), packageController.createPackage);

// Получение всех наборов
router.get('/', packageController.getAllPackagesWithoutAllMenu);

router.get('/packages', packageController.getAllPackages);

// Получение набора по ID
router.get('/:id', packageController.getPackageById);

// Обновление набора
router.put('/:id', authenticateJWT, uploadPackages.single("image"), packageController.updatePackage);

// Удаление набора
router.delete('/:id', authenticateJWT, packageController.deletePackage);

module.exports = router;
