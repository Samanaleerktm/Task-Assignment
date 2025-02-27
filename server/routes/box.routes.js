const express = require("express");
const BoxController = require("../controllers/box.controller");

const router = express.Router();

// Routes for Box Types
router.get("/boxtypes", BoxController.getAllBoxTypes); 
router.get("/boxtypes/:id", BoxController.getBoxTypeById); 
router.put("/boxtypes/:id", BoxController.updateBoxType); 

module.exports = router;
