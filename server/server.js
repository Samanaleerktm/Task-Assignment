    const express = require("express");
    const cors = require("cors");
    const { sequelize } = require("./config/config");
    require('./models/associations');
    const boxRoutes = require("./routes/box.routes");
    const orderRoutes = require('./routes/order.routes');
    const BoxType = require("./models/boxType");
    
    const app = express();
    const PORT = process.env.PORT || 5000;
    
    
    app.use(cors({
      origin: ['http://localhost:5173', 'http://localhost:5174'], 
      credentials: true 
    }));
    
   
    app.use(express.json());
    
    app.get("/", (req, res) => {
      res.send("Box Pricing API is running...");
    });
    
    
    app.use('/api/orders', orderRoutes);
    app.use("/api", boxRoutes);
    
    
    sequelize.sync({ alter: true })
      .then(async () => {
        console.log("Database synced successfully!");
    
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
    
        
        app.listen(PORT, () => {
          console.log(`Server is running on port ${PORT}`);
        });
    
      })
      .catch((err) => {
        console.error("Error syncing database:", err);
      });
    
   
    sequelize.authenticate()
      .then(() => console.log("Database connected!"))
      .catch((error) => console.error("Database connection error:", error));
    