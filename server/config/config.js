const { Sequelize } = require("sequelize");  
require("dotenv").config();

// Define the configuration object
const config = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
  },
};

// Create a Sequelize instance properly
const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect,
    port: config.development.port,
    logging: false, 
  }
);

// Test the Sequelize connection
sequelize.authenticate()
  .then(() => console.log("Sequelize connected successfully"))
  .catch((err) => console.error("Sequelize connection error:", err));

  
// Export the sequelize instance
module.exports = { sequelize, config };
