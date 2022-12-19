import { Grid, useTheme } from "@mui/material";
// import Image from "next/image";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { QuranFont } from "src/constants/QuranReader";
import { selectQuranReaderStyles } from "src/redux/slices/QuranReader/styles";
import { selectTheme } from "src/redux/slices/theme";
import { ThemeTypes } from "src/styles/theme/modes";
import BasmalaSVG from "../../../public/assets/icons/basmala.svg";

const Bismillah = () => {
  const theme = useTheme();
  const { type } = useSelector(selectTheme, shallowEqual);
  const { quranFont } = useSelector(selectQuranReaderStyles, shallowEqual);
  return (
    <Grid
      sx={{
        color:
          type === ThemeTypes.Dark &&
          quranFont === QuranFont.Tajweed &&
          theme.palette.text.secondary,
      }}
    >
      <BasmalaSVG
        width={220}
        height={45}
        // fill={}
      />
    </Grid>
  );
};

export default Bismillah;

// <Image
//   src="/assets/icons/basmala.svg"
//   component="img"
//   width={220}
//   height={45}
//   alt="basmala"
// />
