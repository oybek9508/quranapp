import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useMemo } from "react";
import { Provider, shallowEqual, useSelector } from "react-redux";
import AudioPlayer from "src/components/audio/SurahAudioPlayer";
import Layout from "src/components/layout/Layout";
import DataContext from "src/context/DataContext";
import { selectTheme } from "src/redux/slices/theme";
import { getDesignTokens } from "src/styles/theme";
import { AudioPlayerMachineProvider } from "src/xstate/AudioPlayerMachineContext";
import { store } from "../redux/store/index";
import "../styles/globals.css";

// const clientSideEmotionCache = createEmotionCache();

function App({ props }) {
	const { Component, pageProps } = props;
	console.log("pageProps", pageProps);
	const { chaptersData, chapterId } = pageProps;
	const { type } = useSelector(selectTheme, shallowEqual);

	const theme = useMemo(() => createTheme(getDesignTokens(type), { mode: type }), [type]);

	return (
		<DataContext.Provider value={pageProps?.chaptersData}>
			<AudioPlayerMachineProvider>
				<ThemeProvider theme={theme}>
					<Layout
						type="back"
						singleChapter={{
							...pageProps?.chaptersData[pageProps?.chapterId],
							id: pageProps?.chapterId,
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
