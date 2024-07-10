const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const { authenticateJWT, authorizeAdmin } = require('../middleware/authMiddleware');

// Создание новой статьи
router.post('/', authenticateJWT, authorizeAdmin, articleController.createArticle);

// Получение всех статей
router.get('/', authenticateJWT, authorizeAdmin, articleController.getAllArticles);

// Получение статьи по ID
router.get('/:id', authenticateJWT, authorizeAdmin, articleController.getArticleById);

// Обновление статьи
router.put('/:id', authenticateJWT, authorizeAdmin, articleController.updateArticle);

// Удаление статьи
router.delete('/:id', authenticateJWT, authorizeAdmin, articleController.deleteArticle);

module.exports = router;
