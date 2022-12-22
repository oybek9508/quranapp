import { createSlice } from "@reduxjs/toolkit";
import SliceName from "src/redux/constants/SliceNames";
import { getReadingPreferencesInitialState } from "src/redux/defaultSettings/util";

const readingPreferences = createSlice({
  name: SliceName.READING_PREFERENCES,
  initialState: getReadingPreferencesInitialState(),
  reducers: {
    setReadingPreference: (state, action) => {
      state.readingPreference = action.payload;
    },
    setWordClickFunctionality: (state, action) => {
      state.wordClickFunctionality = action.payload;
    },
  },
});

export const { setReadingPreference, setWordClickFunctionality } =
  readingPreferences.actions;

export const selectReadingPreferences = (state) => {
  return state.readingPreferences;
};

export const selectWordClickFunctionality = (state) =>
  state.readingPreferences.wordClickFunctionality;

export default readingPreferences.reducer;
