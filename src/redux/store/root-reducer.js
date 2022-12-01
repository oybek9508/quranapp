import { combineReducers } from "@reduxjs/toolkit";
import themeSlice from "../slices/theme";

export const rootReducer = combineReducers({
  theme: themeSlice,
});
