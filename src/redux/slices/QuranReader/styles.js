import { createSlice } from "@reduxjs/toolkit";
import SliceName from "src/redux/constants/SliceNames";
import { getQuranReaderStylesInitialState } from "src/redux/defaultSettings/util";

const quranReaderStylesSlice = createSlice({
  name: SliceName.QURAN_READER_STYLES,
  initialState: getQuranReaderStylesInitialState(),
  reducers: {
    setQuranFont: (state, action) => {
      state.quranFont = action.payload;
    },
  },
});

export const { setQuranFont } = quranReaderStylesSlice.actions;
export const selectQuranReaderStyles = (state) => state.quranReaderStyles;
export const selectIsUsingDefaultFont = (state) =>
  !!state.quranReaderStyles.isUsingDefaultFont;

export default quranReaderStylesSlice.reducer;
