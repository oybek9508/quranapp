import {
  amber,
  blue,
  blueGrey,
  deepOrange,
  grey,
  yellow,
} from "@mui/material/colors";
import { ThemeTypes } from "./modes";

export const getDesignTokens = (mode) => {
  return {
    palette: {
      primary: {
        ...amber,
        ...(mode === ThemeTypes.Dark && {
          main: amber[300],
        }),
      },
      ...(mode === ThemeTypes.Dark && {
        background: {
          default: "#1b3a4b",
          paper: "#065a60",
        },
        primary: {
          main: "#fff",
        },
      }),
      ...(mode === ThemeTypes.Main && {
        background: {
          default: "#f4faee",
          // paper: amber[600],
        },

        primary: {
          main: "#005F33",
        },
      }),

      text: {
        ...(mode === ThemeTypes.Light && {
          primary: grey[900],
          secondary: grey[800],
        }),
        ...(mode === ThemeTypes.Dark && {
          primary: "#fff",
          secondary: grey[500],
        }),
        ...(mode === ThemeTypes.Main && {
          primary: "#000",
          secondary: grey[900],
        }),
      },
    },
    typography: {
      ...(mode === ThemeTypes.Dark && {
        v6: {},
      }),
    },
  };
};

// background-color: #f4faee;
// background-image: url("https://www.transparenttextures.com/patterns/textured-paper.png");
