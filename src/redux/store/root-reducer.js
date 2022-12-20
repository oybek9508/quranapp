import { combineReducers } from "@reduxjs/toolkit";
import themeSlice from "../slices/theme";
import quranReaderStylesSlice from "../slices/QuranReader/styles";
import readingPreferences from "../slices/QuranReader/readingPreferences";
import navbarSlice from "../slices/navbar";
import audioSlice from "../slices/AudioPlayer/state";

export const rootReducer = combineReducers({
  theme: themeSlice,
  navbar: navbarSlice,
  quranReaderStyles: quranReaderStylesSlice,
  readingPreferences: readingPreferences,
  audioSlice,
});
