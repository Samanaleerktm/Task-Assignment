import React from "react";
import { TextField, IconButton, Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Remove } from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";

const packageOptions = ["Box A", "Box B", "Box C"];

interface PackageItemProps {
  pkg: {
    type: string;
    length: string;
    width: string;
    height: string;
    quantity: string;
  };
  index: number;
  onChange: (index: number, field: string, value: string) => void;
  onRemove: (index: number) => void;
  canRemove: boolean;
}

const PackageItem: React.FC<PackageItemProps> = ({ pkg, index, onChange, onRemove, canRemove }) => {
  
  const handleSelectChange = (event: SelectChangeEvent) => {
    onChange(index, "type", event.target.value as string);
  };

  return (
    <div className="flex items-center gap-6 p-6 mb-4 border border-black rounded-lg shadow-md max-w-[1000px]">
      
      
      <Box sx={{ minWidth: 200 }}>
        <FormControl fullWidth size="small">
          <InputLabel id={`package-type-label-${index}`}>Package Type</InputLabel>
          <Select
            labelId={`package-type-label-${index}`}
            id={`package-type-${index}`}
            value={pkg.type}
            onChange={handleSelectChange}
          >
            {packageOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

  
      <div className="flex gap-x-8 mx-8">
      {["length", "width", "height", "quantity"].map((field) => (
        <TextField
          key={field}
          label={field.charAt(0).toUpperCase() + field.slice(1)}
          type="number"
          value={pkg[field as keyof typeof pkg]}
          onChange={(e) => onChange(index, field, e.target.value)}
          className="w-36"
          size="small"
          InputProps={{
            endAdornment: field !== "quantity" ? (
              <InputAdornment position="end">cm</InputAdornment>
            ) : null,
          }}
        />
      ))}
  </div>
    
      {canRemove && (
        <IconButton onClick={() => onRemove(index)}>
          <Remove color="error" />
        </IconButton>
      )}
    </div>
  );
};

export default PackageItem;
