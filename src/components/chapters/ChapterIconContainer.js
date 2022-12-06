import { Grid, Typography } from "@mui/material";
import React from "react";
import ChapterIcon from "./ChapterIcon";

const ChapterIconContainer = ({ id, hasSurahPrefix = true, isBanner }) => {
  return (
    <Grid container alignItems="center" justifyContent="center">
      <ChapterIcon id={id} isBanner={isBanner} />
      {hasSurahPrefix && <ChapterIcon id="surah" isBanner={isBanner} />}
    </Grid>
  );
};

export default ChapterIconContainer;
