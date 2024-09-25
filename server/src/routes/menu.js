const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

// Получение меню
router.get('/', menuController.getMenu);

router.get('/ids', menuController.getMenuIdsController);

// Сохранение меню
router.post('/', menuController.createMenu);

// Обновление оддного дня из меню
router.put("/:id", menuController.updatedDayMenu);

// Удаление блюда
router.delete('/:id', menuController.deleteDish);

module.exports = router;