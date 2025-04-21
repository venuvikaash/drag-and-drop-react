import React, { useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  backgroundColor: "#EEF4E7", // Light greenish background
  borderRadius: "25px", // Rounded corners
  padding: "5px",
  display: "inline-flex",
  height:"50px"
}));

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  textTransform: "none",
  color: "#6B7280", // Grey color for inactive buttons
  fontWeight: "300",
  fontFamily:"Manrope !important",
  border: "none",
  borderRadius: "25px !important",
  fontSize:"12px",
  "&.Mui-selected": {
    backgroundColor: "white",
    color: "black",
    fontWeight: "bold",
    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
  },
  "&:hover": {
    backgroundColor: "white",
  },
}));

const SegmentedControl = () => {
  const [selected, setSelected] = useState("HR Operation");

  const handleChange = (event, newValue) => {
    if (newValue !== null) {
      setSelected(newValue);
    }
  };

  return (
    <StyledToggleButtonGroup
      value={selected}
      exclusive
      onChange={handleChange}
    >
      <StyledToggleButton value="HR Operation">HR Operation</StyledToggleButton>
      <StyledToggleButton value="Manager Board">Manager Board</StyledToggleButton>
      <StyledToggleButton value="Employee Board">Employee Board</StyledToggleButton>
    </StyledToggleButtonGroup>
  );
};

export default SegmentedControl;
