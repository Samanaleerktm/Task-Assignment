const BoxType = require("../models/boxType");


class BoxService {
  // Get all box types
  async getAllBoxTypes() {
    try {
      return await BoxType.findAll();
    } catch (error) {
      throw new Error("Error fetching box types: " + error.message);
    }
  }

  // Get a box type by its ID
  async getBoxTypeById(id) {
    try {
      const boxType = await BoxType.findByPk(id);
      if (!boxType) {
        throw new Error("Box type not found");
      }
      return boxType;
    } catch (error) {
      throw new Error("Error fetching box type: " + error.message);
    }
  }

  // Create a new box type
  async createBoxType(data) {
    try {
      return await BoxType.create(data);
    } catch (error) {
      throw new Error("Error creating box type: " + error.message);
    }
  }

  // Update an existing box type
  async updateBoxType(id, data) {
    try {
      const boxType = await BoxType.findByPk(id);
      if (!boxType) {
        throw new Error("Box type not found");
      }
      return await boxType.update(data);
    } catch (error) {
      throw new Error("Error updating box type: " + error.message);
    }
  }

  // Delete a box type
  async deleteBoxType(id) {
    try {
      const boxType = await BoxType.findByPk(id);
      if (!boxType) {
        throw new Error("Box type not found");
      }
      await boxType.destroy();
      return { message: "Box type deleted successfully" };
    } catch (error) {
      throw new Error("Error deleting box type: " + error.message);
    }
  }
}

module.exports = new BoxService();
