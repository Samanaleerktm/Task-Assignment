const orderService = require('../services/order.service');

exports.createOrder = async (req, res) => {
    try {
        const orderData = req.body;
        const order = await orderService.createOrder(orderData);
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getLastOrder = async (req, res) => {
    try {
        const order = await orderService.getLastOrder();
        if (!order) {
            return res.status(404).json({ message: "No orders found" });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
