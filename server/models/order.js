const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/config');


const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  delivery_charge: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  total_price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  rate: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
    timestamps: false, 
});


module.exports = Order;
