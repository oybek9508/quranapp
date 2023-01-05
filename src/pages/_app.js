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
import {
  AudioPlayerMachineContext,
  AudioPlayerMachineProvider,
} from "src/xstate/AudioPlayerMachineContext";
import AudioPlayer from "src/components/audio/SurahAudioPlayer";

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

  console.log("theme", theme);

  return (
    <DataContext.Provider value={pageProps.chaptersData}>
      <AudioPlayerMachineProvider>
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
            <AudioPlayer />
          </Layout>
        </ThemeProvider>
      </AudioPlayerMachineProvider>
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
