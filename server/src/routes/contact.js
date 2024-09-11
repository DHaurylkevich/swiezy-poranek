const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Получение всех контактов
router.get('/', contactController.getAllContacts);

// Получение контакта по ID
router.get('/:id', contactController.getContactById);

// Создание нового контакта
router.post('/', contactController.createContact);

// Обновление контакта
router.put('/:id', contactController.updateContact);

// Удаление контакта
router.delete('/:id', contactController.deleteContact);

module.exports = router;