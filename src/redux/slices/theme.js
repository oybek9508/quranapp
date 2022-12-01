import { createSlice } from "@reduxjs/toolkit";
import { getThemeInitialState } from "../defaultSettings/util";
import SliceName from "../constants/SliceNames";

const themeSlice = createSlice({
  name: SliceName.THEME,
  initialState: getThemeInitialState(),
  reducers: {
    setTheme: (state, action) => {
      state.type = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export const selectTheme = (state) => state.theme;
export default themeSlice.reducer;
