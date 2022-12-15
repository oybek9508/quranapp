import "../styles/globals.css";
import { Provider, shallowEqual, useSelector } from "react-redux";
import { store } from "../redux/store/index";
// import createEmotionCache from "src/utility/createEmotionCache";
import { CacheProvider } from "@emotion/react";
import {
  ThemeProvider,
  CssBaseline,
  useTheme,
  createTheme,
} from "@mui/material";
import { selectTheme } from "src/redux/slices/theme";
import { useMemo } from "react";
import { getDesignTokens } from "src/styles/theme";

// const clientSideEmotionCache = createEmotionCache();

function App({ props }) {
  const { Component, pageProps } = props;
  const { type } = useSelector(selectTheme, shallowEqual);
  const theme = useMemo(() => createTheme(getDesignTokens(type)), [type]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

function MyApp(props) {
  return (
    <Provider store={store}>
      <App props={props} />
    </Provider>
  );
}

export default MyApp;
