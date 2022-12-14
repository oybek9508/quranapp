import { Grid, Typography } from "@mui/material";
import React from "react";
import ChapterIcon from "./ChapterIcon";

export const ChapterIconsSize = {
  Small: "small",
  Medium: "medium",
  Large: "large",
  Mega: "mega",
};

const ChapterIconContainer = ({
  id,
  hasSurahPrefix = true,
  size = ChapterIconsSize.Medium,
  isBanner,
}) => {
  return (
    <Grid container alignItems="center" justifyContent="center">
      <ChapterIcon id={id} isBanner={isBanner} />
      {hasSurahPrefix && <ChapterIcon id="surah" isBanner={isBanner} />}
    </Grid>
  );
};

export default ChapterIconContainer;
