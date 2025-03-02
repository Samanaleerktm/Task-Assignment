const Order  = require('../models/order');
const OrderItem  = require('../models/orderItem');
const BoxType = require('../models/boxType');

const RATE = 472.41; // per cubic meter
const DELIVERY_CHARGE = 5;

exports.createOrder = async (orderData) => {
    return await Order.sequelize.transaction(async (t) => {
        const { items } = orderData;

        let totalPrice = 0;

        const newOrder = await Order.create(
            { delivery_charge: DELIVERY_CHARGE, total_price: 0, rate: RATE },
            { transaction: t }
        );

        for (const item of items) {
            let { box_type_id, quantity, length, width, height } = item;

            if (box_type_id) {
                const boxType = await BoxType.findByPk(box_type_id);
                if (boxType) {
                    length = boxType.length;
                    width = boxType.width;
                    height = boxType.height;
                }
            }

            const volume = (length * width * height) / 1000000; // Convert cm³ to m³
            const price = volume * quantity * RATE;

            totalPrice += price;

            await OrderItem.create(
                {
                    order_id: newOrder.id,
                    box_type_id,
                    quantity,
                    price,
                    length,
                    width,
                    height,
                },
                { transaction: t }
            );
        }

        totalPrice += DELIVERY_CHARGE;
        await newOrder.update({ total_price: totalPrice }, { transaction: t });

        return newOrder;
    });
};

exports.getLastOrder = async () => {
    const order = await Order.findOne({ 
        order: [['id', 'DESC']], 
        include: [{
            model: OrderItem,
            include: [BoxType]  
        }]
    });

    if (!order) return null;

   
    order.OrderItems.forEach(item => {
        if (!item.box_type_id || !item.BoxType) {
            item.BoxType = { name: "Box C" };
        }
    });

    return order;
};


exports.getAllOrders = async () => {
    const orders = await Order.findAll({
        include: [{
            model: OrderItem,
            include: [BoxType]  
        }]
     });

     orders.forEach(order => {
        order.OrderItems.forEach(item => {
            if (!item.box_type_id || !item.BoxType) {
                item.BoxType = { name: "Box C" }; 
            }
        });
    });

    return orders;
};
 
