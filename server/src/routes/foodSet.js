const express = require('express');
const router = express.Router();
const foodSetController = require('../controllers/foodSet');
const { authenticateJWT, authorizeAdmin } = require('../middleware/authMiddleware');

// Создание нового зестава
router.post('/', authenticateJWT, authorizeAdmin, foodSetController.createFoodSet);

// Получение всех зеставов
router.get('/', authenticateJWT, authorizeAdmin, foodSetController.getAllFoodSets);

// Получение зестава по ID
router.get('/:id', authenticateJWT, authorizeAdmin, foodSetController.getFoodSetById);

// Обновление зестава
router.put('/:id', authenticateJWT, authorizeAdmin, foodSetController.updateFoodSet);

// Удаление зестава
router.delete('/:id', authenticateJWT, authorizeAdmin, foodSetController.deleteFoodSet);

module.exports = router;
