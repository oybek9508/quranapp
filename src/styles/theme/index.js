import {
  amber,
  blue,
  blueGrey,
  deepOrange,
  grey,
  yellow,
} from "@mui/material/colors";
import { shallowEqual, useSelector } from "react-redux";
import { selectTheme } from "src/redux/slices/theme";
import { ThemeTypes } from "./types";
import React from "react";

export const getDesignTokens = (mode) => {
  return {
    palette: {
      mode,
      primary: {
        ...amber,
        ...(mode === ThemeTypes.Dark && {
          main: amber[300],
        }),
      },
      ...(mode === ThemeTypes.Dark && {
        background: {
          default: deepOrange[900],
          paper: deepOrange[900],
        },
      }),

      text: {
        ...(mode === ThemeTypes.Light
          ? {
              primary: grey[900],
              secondary: grey[800],
            }
          : {
              primary: "#fff",
              secondary: grey[500],
            }),
      },
    },
  };
};

const ThemeMode = () => {
  const { type } = useSelector(selectTheme, shallowEqual);
  getDesignTokens(type);
  return type;
};

export default ThemeMode;
