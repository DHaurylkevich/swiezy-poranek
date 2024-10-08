const express = require('express');
const router = express.Router();
const { authenticateJWT } = require("../middleware/auth");
const menuController = require('../controllers/menuController');

// Получение меню
router.get('/', menuController.getMenu);

router.get('/ids', menuController.getMenuIdsController);

// Сохранение меню
router.post('/', authenticateJWT, menuController.createMenu);

// Обновление оддного дня из меню
router.put("/:id", authenticateJWT, menuController.updatedDayMenu);

// Удаление блюда
router.delete('/:id', authenticateJWT, menuController.deleteDish);

module.exports = router;