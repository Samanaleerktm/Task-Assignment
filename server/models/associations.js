const Order = require('./order');
const OrderItem = require('./orderItem');
const BoxType = require('./boxType');


Order.hasMany(OrderItem, { foreignKey: 'order_id', onDelete: 'CASCADE' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });

OrderItem.belongsTo(BoxType, { foreignKey: 'box_type_id' });

module.exports = { Order, OrderItem, BoxType };
