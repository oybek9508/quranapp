import { Grid } from "@mui/material";
import React from "react";

const Raw = ({ children }) => {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      {children}
    </Grid>
  );
};

export default Raw;
