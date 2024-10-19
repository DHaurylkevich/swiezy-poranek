const express = require('express');
const router = express.Router();
const { authenticateJWT } = require("../middleware/auth");
const packageController = require('../controllers/packageController');
const uploadPackages = require("../middleware/upload").uploadPackages;

router.post('/create',authenticateJWT,  uploadPackages.single("image"), packageController.createPackage);

router.get('/', packageController.getAllPackagesWithoutAllMenu);

router.get('/packages', packageController.getAllPackages);

router.get('/:id', packageController.getPackageById);

router.put('/:id', authenticateJWT, uploadPackages.single("image"), packageController.updatePackage);

router.delete('/:id', authenticateJWT, packageController.deletePackage);

module.exports = router;
