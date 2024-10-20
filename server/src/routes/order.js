const { authenticateJWT } = require("../middleware/auth");
const express = require('express');
const orderController = require('../controllers/orderController');
const router = express.Router();

router.post('/create', orderController.createOrder);
router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.put('/:id', orderController.updateOrderStatus);
router.delete('/:id', orderController.deleteOrderById);

module.exports = router;