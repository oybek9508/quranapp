import React, { useMemo, useRef, useState } from "react";
import AyahList from "./AyahList";
import AyahItem from "./AyahItem";
import TranslationHeader from "./Header";
import { Grid } from "@mui/material";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
// import { useSingleChapterTranslation } from "src/api/quran-translation";

const TranslationView = ({
  initialData,
  value,
  resourceId,
  quranReaderType,
  quranReaderStyles,
}) => {
  return (
    <Grid sx={{ width: "100%" }}>
      <TranslationHeader initialData={initialData} />
      <AyahList initialData={initialData} value={value} />
    </Grid>
  );
};

export default TranslationView;
