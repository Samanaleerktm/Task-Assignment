const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/config');

const BoxType = sequelize.define('BoxType', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {  
    type: DataTypes.STRING,
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

module.exports = BoxType;
