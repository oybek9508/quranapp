import { Divider, Grid } from "@mui/material";
import React from "react";
import Title from "./Title";
import Raw from "./Raw";
import Label from "./Label";

const Section = ({ children }) => {
  return (
    <Grid>
      <Grid p={2}>{children}</Grid>
      <div>
        <Divider />
      </div>
    </Grid>
  );
};

Section.Title = Title;
Section.Raw = Raw;
Section.Label = Label;
export default Section;
