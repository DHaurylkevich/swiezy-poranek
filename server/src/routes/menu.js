const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

// Получение меню
router.get('/', menuController.getMenu);

// Сохранение или обновление меню
router.post('/', menuController.saveMenu);

// Удаление блюда
router.delete('/:id', menuController.deleteDish);

module.exports = router;