const express = require('express');
const router = express.Router();
const { authenticateJWT } = require("../middleware/auth");
const contactController = require('../controllers/contactController');

// Получение всех контактов
router.get('/', contactController.getAllContacts);

// Получение контакта по ID
router.get('/:id', contactController.getContactById);

// Создание нового контакта
router.post('/', authenticateJWT, contactController.createContact);

// Обновление контакта
router.put('/:id', authenticateJWT, contactController.updateContact);

// Удаление контакта
router.delete('/:id', authenticateJWT, contactController.deleteContact);

module.exports = router;