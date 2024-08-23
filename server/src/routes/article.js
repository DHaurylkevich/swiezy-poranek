const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
// const { authenticateJWT, authorizeAdmin } = require('../middleware/authMiddleware');

// Создание новой статьи
router.post('/', articleController.createArticle);

// Получение всех статей
router.get('/', articleController.getAllArticles);

// Получение статьи по ID
router.get('/:id', articleController.getArticleById);

// Обновление статьи
router.put('/:id', articleController.updateArticle);

// Удаление статьи
router.delete('/:id', articleController.deleteArticle);

module.exports = router;
