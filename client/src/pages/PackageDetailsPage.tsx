import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  IconButton,
} from "@mui/material";
import { Remove } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { fetchBoxTypes } from "../apis/api"; 
import {createOrder} from "../apis/orderapi";

interface BoxType {
  id: number;
  name: string;
  length: number | null;
  width: number | null;
  height: number | null;
}

interface PackageItem {
  type: string;
  length: string;
  width: string;
  height: string;
  quantity: string;
}

const PackageDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState<PackageItem[]>([
    { type: "", length: "", width: "", height: "", quantity: "" },
  ]);
  const [boxTypes, setBoxTypes] = useState<BoxType[]>([]);

  // Fetch box types on component mount
  useEffect(() => {
    const loadBoxTypes = async () => {
      try {
        const data = await fetchBoxTypes();
        console.log("Fetched box types:", data); 
        setBoxTypes(data); 
      } catch (error) {
        console.error("Failed to load box types", error);
      }
    };
    loadBoxTypes();
  }, []);

  // Add new package item
  const handleAddPackage = () => {
    setPackages([
      ...packages,
      { type: "", length: "", width: "", height: "", quantity: "" },
    ]);
  };

  // Remove package item
  const handleRemovePackage = (index: number) => {
    setPackages(packages.filter((_, i) => i !== index));
  };

  // Handle dropdown selection
  const handleTypeChange = (index: number, value: string) => {
    const selectedBox = boxTypes.find((box) => box.name === value);
    const updatedPackages = [...packages];

    updatedPackages[index] = {
      type: value,
      length: selectedBox?.length?.toString() || "",
      width: selectedBox?.width?.toString() || "",
      height: selectedBox?.height?.toString() || "",
      quantity: updatedPackages[index].quantity,
    };

    setPackages(updatedPackages);
  };

  // Handle input changes
  const handleChange = (index: number, field: keyof PackageItem, value: string) => {
    const updatedPackages = [...packages];
    updatedPackages[index][field] = value;
    setPackages(updatedPackages);
  };

  // Handle form submission and API integration
  const handleNext = async () => {
    try {
      // Prepare the JSON body for the API
      const orderData = {
        items: packages.map((pkg) => {
          const selectedBox = boxTypes.find((box) => box.name === pkg.type);
          return {
            box_type_id: selectedBox?.id || null,
            length: parseInt(pkg.length),
            width: parseInt(pkg.width),
            height: parseInt(pkg.height),
            quantity: parseInt(pkg.quantity),
          };
        }),
      };

      // Call the createOrder API with the prepared data
      await createOrder(orderData);

      // Navigate to the next page (Summary page)
      navigate("/summary", { state: { packages } });
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <div>
      <Box className="bg-white border border-primary border-4 shadow-lg rounded-xl p-6 max-w-[1120px] mx-auto mt-10">
        <h2 className="text-lg font-semibold mb-4">Package Details</h2>

        {packages.map((pkg, index) => {
          const selectedBox = boxTypes.find((box) => box.name === pkg.type);
          const isFixedSize = pkg.type === "Box A" || pkg.type === "Box B"; 

          return (
            <div
              key={index}
              className="flex items-center gap-6 p-6 mb-4 border border-black rounded-lg shadow-md"
            >
              <FormControl sx={{ minWidth: 200 }} size="small">
                <InputLabel>Package Type</InputLabel>
                <Select
                  value={pkg.type}
                  onChange={(e: SelectChangeEvent) => handleTypeChange(index, e.target.value)}
                >
                  {boxTypes.map((box) => (
                    <MenuItem key={box.id} value={box.name}>
                      {box.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {["length", "width", "height"].map((field) => (
                <TextField
                  key={field}
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  type="number"
                  value={pkg[field as keyof PackageItem]}
                  onChange={(e) => handleChange(index, field as keyof PackageItem, e.target.value)}
                  className="w-36"
                  size="small"
                  disabled={isFixedSize} 
                />
              ))}

              <TextField
                label="Quantity"
                type="number"
                value={pkg.quantity}
                onChange={(e) => handleChange(index, "quantity", e.target.value)}
                className="w-36"
                size="small"
              />

              {index > 0 && (
                <IconButton onClick={() => handleRemovePackage(index)}>
                  <Remove color="error" />
                </IconButton>
              )}
            </div>
          );
        })}

        <div className="flex justify-between mt-4">
          <Button variant="outlined" color="warning" onClick={handleAddPackage}>
            Add Another
          </Button>
          <Button variant="contained" color="warning" onClick={handleNext}>
            Next
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default PackageDetailsPage;
