const express = require('express');
const router = express.Router();
const { authenticateJWT } = require("../middleware/auth");
const menuController = require('../controllers/menuController');

router.get('/', menuController.getMenu);

router.get('/ids', menuController.getMenuIdsController);

router.post('/', authenticateJWT, menuController.createMenu);

router.put("/:id", authenticateJWT, menuController.updatedDayMenu);

router.delete('/:id', authenticateJWT, menuController.deleteDish);

module.exports = router;