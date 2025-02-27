const BoxService = require("../services/box.service");


class BoxController {
  // Get all box types
  async getAllBoxTypes(req, res) {
    try {
      const boxTypes = await BoxService.getAllBoxTypes();
      res.status(200).json(boxTypes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get a box type by ID
  async getBoxTypeById(req, res) {
    const { id } = req.params;
    try {
      const boxType = await BoxService.getBoxTypeById(id);
      res.status(200).json(boxType);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  // Create a new box type
  async createBoxType(req, res) {
    const { name, length, width, height } = req.body;
    try {
      const newBoxType = await BoxService.createBoxType({ name, length, width, height });
      res.status(201).json(newBoxType);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Update an existing box type
  async updateBoxType(req, res) {
    const { id } = req.params;
    const { name, length, width, height } = req.body;
    try {
      const updatedBoxType = await BoxService.updateBoxType(id, { name, length, width, height });
      res.status(200).json(updatedBoxType);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Delete a box type
  async deleteBoxType(req, res) {
    const { id } = req.params;
    try {
      const result = await BoxService.deleteBoxType(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
}

module.exports = new BoxController();
