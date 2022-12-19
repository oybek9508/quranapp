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
      ...(mode === ThemeTypes.Light && {
        background: {
          default: grey[100],
          // paper: "#fff",
        },
        primary: {
          main: grey[900],
        },
      }),
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
          deafult: "#f4faee",
          paper: "#94C2A5",
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
  };
};

// background-color: #f4faee;
// background-image: url("https://www.transparenttextures.com/patterns/textured-paper.png");
