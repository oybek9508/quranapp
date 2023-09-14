import React from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Grid } from "@mui/material";

const SelectionCard = ({ label, value, onClick }) => {
  return (
    <Grid
      onClick={onClick}
      container
      alignItems="center"
      justifyContent="space-between"
    >
      <Grid>
        <Grid>{label}</Grid>
        <Grid>{value}</Grid>
      </Grid>
      <Grid>
        <KeyboardArrowRightIcon />
      </Grid>
    </Grid>
  );
};

export default SelectionCard;
