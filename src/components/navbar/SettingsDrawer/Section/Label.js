import { Grid } from "@mui/material";
import React from "react";

const Label = ({ children }) => {
  return (
    <Grid container alignItems="center">
      {children}
    </Grid>
  );
};

export default Label;
