const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/config');
const BoxType = require('./boxType');

const OrderItem = sequelize.define('OrderItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  length: {
    type: DataTypes.FLOAT,
  },
  width: {
    type: DataTypes.FLOAT,
  },
  height: {
    type: DataTypes.FLOAT,
  },
}, {
    timestamps: false, 
});


OrderItem.belongsTo(BoxType, { foreignKey: 'box_type_id', onDelete: 'CASCADE' });


module.exports = OrderItem;
