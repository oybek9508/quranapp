import { createSlice } from "@reduxjs/toolkit";
import SliceName from "src/redux/constants/SliceNames";

const initialState = {
  hoveredVerseKey: null,
  selectedVerseKey: null,
};

const readingViewVerse = createSlice({
  name: SliceName.READING_VIEW_HOVERED_VERSE,
  initialState,
  reducers: {
    setReadingHoveredVerseKey: (state, action) => {
      state.hoveredVerseKey = action.payload;
    },
    setReadingSelectedVerseKey: (state, action) => {
      state.selectedVerseKey = action.payload;
    },
  },
});

export const { setReadingHoveredVerseKey, setReadingSelectedVerseKey } =
  readingViewVerse.actions;

export const selectReadingViewHoveredVerseKey = (state) =>
  state.readingViewVerse.hoveredVerseKey;
export const selectReadingViewSelectedVerseKey = (state) =>
  state.readingViewVerse.selectedVerseKey;

export default readingViewVerse.reducer;
