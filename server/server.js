/* const express = require("express");
const { sequelize } = require("./config/config");
require('./models/associations'); // Ensure associations are set up
const boxRoutes = require("./routes/box.routes"); 
const orderRoutes = require('./routes/order.routes');
const BoxType = require("./models/boxType");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware for JSON parsing
app.use(express.json()); 

// Test route
app.get("/", (req, res) => {
  res.send("Box Pricing API is running...");
});

// Routes
app.use('/api/orders', orderRoutes);
app.use("/api", boxRoutes);

// Sync database (avoiding forced table deletion)
sequelize.sync({ alter: true }) 
  .then(async () => {
    console.log("Database synced successfully!");

    // Insert default BoxTypes if they don't exist
    try {
      const boxTypes = await BoxType.findAll();
      if (boxTypes.length === 0) {
        await BoxType.bulkCreate([
          { name: 'Box A', length: 42, width: 42, height: 60 },
          { name: 'Box B', length: 42, width: 42, height: 30 },
          { name: 'Box C', length: null, width: null, height: null }
        ]);
        console.log("Default BoxTypes inserted successfully!");
      }
    } catch (error) {
      console.error("Error inserting default BoxTypes:", error);
    }

    // Start the server only after successful DB connection
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });

// Test the Sequelize connection
sequelize.authenticate()
  .then(() => console.log("Database connected!"))
  .catch((error) => console.error("Database connection error:", error));
 
 
 */
  const express = require("express");
  const cors = require("cors"); 
  const { sequelize } = require("./config/config");
  require('./models/associations'); 
  const boxRoutes = require("./routes/box.routes"); 
  const orderRoutes = require('./routes/order.routes');
  const BoxType = require("./models/boxType");
  
  const app = express();
  const PORT = process.env.PORT || 5000;
  
  // Middleware for CORS (Allow all origins or set your frontend origin)
  app.use(cors({ origin: 'http://localhost:5174' })); 
  // Middleware for JSON parsing
  app.use(express.json()); 
  
  // Test route
  app.get("/", (req, res) => {
    res.send("Box Pricing API is running...");
  });
  
  // Routes
  app.use('/api/orders', orderRoutes);
  app.use("/api", boxRoutes);
  
  // Sync database (avoiding forced table deletion)
  sequelize.sync({ alter: true }) 
    .then(async () => {
      console.log("Database synced successfully!");
  
      // Insert default BoxTypes if they don't exist
      try {
        const boxTypes = await BoxType.findAll();
        if (boxTypes.length === 0) {
          await BoxType.bulkCreate([
            { name: 'Box A', length: 42, width: 42, height: 60 },
            { name: 'Box B', length: 42, width: 42, height: 30 },
            { name: 'Box C', length: null, width: null, height: null }
          ]);
          console.log("Default BoxTypes inserted successfully!");
        }
      } catch (error) {
        console.error("Error inserting default BoxTypes:", error);
      }
  
      // Start the server only after successful DB connection
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
  
    })
    .catch((err) => {
      console.error("Error syncing database:", err);
    });
  
  // Test the Sequelize connection
  sequelize.authenticate()
    .then(() => console.log("Database connected!"))
    .catch((error) => console.error("Database connection error:", error));
  