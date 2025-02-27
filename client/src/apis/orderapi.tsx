import axios from "axios";

// API endpoint for creating the order
const API_URL = "http://localhost:5000/api/orders"; 



// Create order API call
export const createOrder = async (orderData: any) => {
  try {
    const response = await axios.post(`${API_URL}/create`, orderData);
    console.log("Order created successfully:", response.data);
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

// Get last order API call
export const getLastOrder = async () => {
    try {
      const response = await axios.get(`${API_URL}/last`);
      console.log("Fetched last order:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching last order:", error);
      throw error;
    }
  };
