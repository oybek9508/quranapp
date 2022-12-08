import { createSlice } from "@reduxjs/toolkit";
import SliceName from "src/redux/constants/SliceNames";
import { getReadingPreferencesInitialState } from "src/redux/defaultSettings/util";

const readingPreferences = createSlice({
  name: SliceName.READING_PREFERENCES,
  initialState: getReadingPreferencesInitialState(),
  reducer: {},
});

export const selectReadingPreferences = (state) => {
  return state.readingPreferences;
};

export default readingPreferences.reducer;
