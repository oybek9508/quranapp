import { createSlice } from "@reduxjs/toolkit";
import SliceName from "src/redux/constants/SliceNames";
import { getTranslationsInitialState } from "src/redux/defaultSettings/util";

const translations = createSlice({
  name: SliceName.TRANSLATIONS,
  initialState: getTranslationsInitialState(),
  reducers: {},
});

export const {} = translations.actions;

export const selectIsUsingDefaultTranslations = (state) =>
  state.translations.isUsingDefaultTranslations;

export default translations.reducer;
