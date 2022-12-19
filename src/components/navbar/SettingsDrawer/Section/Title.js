import { Grid } from "@mui/material";
import React from "react";

const Title = ({ children }) => {
  return (
    <Grid container alignItems="center" sx={{ fontWeight: "bold", mb: 2 }}>
      {children}
    </Grid>
  );
};

export default Title;
