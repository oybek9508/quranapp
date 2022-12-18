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
          default: "#D7DBD6",
          paper: deepOrange[600],
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
          primary: grey[900],
          secondary: grey[500],
        }),
        ...(mode === ThemeTypes.Main && {
          primary: "#000",
          secondary: grey[900],
        }),
      },
    },
    // overrides: {
    //   MuiCssBaseline: {
    //     "@global": {
    //       body: {
    //         backgroundImage:
    //           "url(https://www.transparenttextures.com/patterns/textured-paper.png)",
    //       },
    //     },
    //   },
    // },
  };
};

// background-color: #f4faee;
// background-image: url("https://www.transparenttextures.com/patterns/textured-paper.png");
