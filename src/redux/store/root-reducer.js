import { combineReducers } from "@reduxjs/toolkit";
import themeSlice from "../slices/theme";
import quranReaderStylesSlice from "../slices/QuranReader/styles";

export const rootReducer = combineReducers({
  theme: themeSlice,
  styles: quranReaderStylesSlice,
});
