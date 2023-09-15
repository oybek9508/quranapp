import { Divider, Grid } from "@mui/material";
import React from "react";
import SurahList from "./SurahList";
import VerseList from "./VerseList";

const SurahSelection = () => {
  return (
    <Grid container justifyContent="space-between">
      <SurahList />
      <Divider orientation="vertical" sx={{ height: "inherit" }} />
      <VerseList />
    </Grid>
  );
};

export default SurahSelection;
