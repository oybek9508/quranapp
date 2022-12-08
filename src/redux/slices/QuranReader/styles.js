import { createSlice } from "@reduxjs/toolkit";
import SliceName from "src/redux/constants/SliceNames";
import { getQuranReaderStylesInitialState } from "src/redux/defaultSettings/util";

const quranReaderStylesSlice = createSlice({
  name: SliceName.QURAN_READER_STYLES,
  initialState: getQuranReaderStylesInitialState(),
  reducers: {},
});

export const selectQuranReaderStyles = (state) => state.quranReaderStyles;

export default quranReaderStylesSlice.reducer;
