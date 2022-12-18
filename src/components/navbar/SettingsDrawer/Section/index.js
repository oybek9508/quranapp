import { Divider } from "@mui/material";
import React from "react";
import Title from "./Title";

const Section = ({ children }) => {
  return (
    <div>
      {children}
      <div>
        <Divider />
      </div>
    </div>
  );
};

Section.Title = Title;

export default Section;
