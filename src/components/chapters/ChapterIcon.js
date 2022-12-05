import { Typography } from "@mui/material";
import React from "react";

const ChapterIcon = ({ id, fontSize, isBanner }) => {
  return (
    <Typography
      sx={{
        fontFamily: "surahnames",
        fontSize: isBanner ? "54px" : "24px",
        color: isBanner && "white",
      }}
    >
      {id.padStart(3, "0")}
    </Typography>
  );
};

export default ChapterIcon;
