import { Grid } from "@mui/material";
import React from "react";

const Title = ({ children }) => {
  return (
    <Grid container alignItems="center" sx={{ fontWeight: "bold" }}>
      {children}
    </Grid>
  );
};

export default Title;
