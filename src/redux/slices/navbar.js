import { createSlice } from "@reduxjs/toolkit";
import SliceNames from "../constants/SliceNames";

export const SettingsView = {
  Body: "body",
  Translation: "translation",
  Reciter: "reciter",
  Tafsir: "tafsir",
  RepeatSettings: "repeatSettings",
};

const navbarSlice = createSlice({
  name: "navbar",
  initialState: {
    open: false,
    isSearchDrawerOpen: false,
  },
  reducers: {
    setToggleDrawer: (state, action) => {
      state.open = action.payload;
    },
    setIsSearchDrawerOpen: (state, action) => {
      state.isSearchDrawerOpen = action.payload;
    },
    setSettingsView: (state, action) => {
      state.settingsView = action.payload;
    },
  },
});

export const toggleDrawer = () => (dispatch, event) => {};

export const { setToggleDrawer, setIsSearchDrawerOpen, setSettingsView } =
  navbarSlice.actions;

export const selectNavbar = (state) => state.navbar;

export default navbarSlice.reducer;
