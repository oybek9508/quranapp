import React from "react";
import AyahList from "./AyahList";
import AyahItem from "./AyahItem";
import TranslationHeader from "./Header";
import { Grid } from "@mui/material";
// import { useSingleChapterTranslation } from "src/api/quran-translation";

const Translation = ({ initialData, value }) => {
  return (
    <Grid sx={{ width: "100%" }}>
      <TranslationHeader initialData={initialData} />
      <AyahList initialData={initialData} value={value} />
    </Grid>
  );
};

export default Translation;
