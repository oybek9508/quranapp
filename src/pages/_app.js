import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../redux/store/index";
// import createEmotionCache from "src/utility/createEmotionCache";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider, CssBaseline } from "@mui/material";

// const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
  const { Component, pageProps } = props;
  return (
    <Provider store={store}>
      <CssBaseline />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
