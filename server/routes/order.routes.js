const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');

router.post('/create', orderController.createOrder);
router.get('/last', orderController.getLastOrder);
router.get('/', orderController.getAllOrders);

module.exports = router;
