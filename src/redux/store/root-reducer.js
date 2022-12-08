import { combineReducers } from "@reduxjs/toolkit";
import themeSlice from "../slices/theme";
import quranReaderStylesSlice from "../slices/QuranReader/styles";
import readingPreferences from "../slices/QuranReader/readingPreferences";

export const rootReducer = combineReducers({
  theme: themeSlice,
  quranReaderStyles: quranReaderStylesSlice,
  readingPreferences: readingPreferences,
});
