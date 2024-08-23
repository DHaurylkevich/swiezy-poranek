const express = require('express');
const router = express.Router();
const foodSetController = require('../controllers/foodSetController');
const { authenticateJWT, authorizeAdmin } = require('../middleware/auth');

// Создание нового набора 
router.post('/', authenticateJWT, authorizeAdmin, foodSetController.createFoodSet);

// Получение всех наборов
router.get('/', foodSetController.getAllFoodSets);

// Получение набора по ID
router.get('/:id', foodSetController.getFoodSetById);

// Обновление набора
router.put('/:id', authenticateJWT, authorizeAdmin, foodSetController.updateFoodSet);

// Удаление набора
router.delete('/:id', authenticateJWT, authorizeAdmin, foodSetController.deleteFoodSet);

module.exports = router;
