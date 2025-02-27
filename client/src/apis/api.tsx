import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; 

export const fetchBoxTypes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/boxtypes`);
    console.log("API Response:", response.data);
    return response.data; 
  } catch (error) {
    console.error("Error fetching box types:", error);
    return [];
  }
};



