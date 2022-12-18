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
import { ThemeTypes } from "src/styles/theme/modes";
import DataContext from "src/context/DataContext";
import Layout from "src/components/layout/Layout";

// const clientSideEmotionCache = createEmotionCache();

function App({ props }) {
  const { Component, pageProps } = props;
  console.log("pageProps", pageProps);
  const { chaptersData, chapterId } = pageProps;
  const { type } = useSelector(selectTheme, shallowEqual);

  const theme = useMemo(
    () => createTheme(getDesignTokens(type), { mode: type }),
    [type]
  );

  return (
    <DataContext.Provider value={pageProps.chaptersData}>
      <ThemeProvider theme={theme}>
        <Layout
          type="back"
          singleChapter={{
            ...chaptersData[chapterId],
            id: chapterId,
          }}
        >
          <CssBaseline />
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </DataContext.Provider>
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
