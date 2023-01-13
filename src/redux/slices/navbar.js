import { createSlice } from "@reduxjs/toolkit";
import SliceNames from "../constants/SliceNames";

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
  },
});

export const toggleDrawer = () => (dispatch, event) => {};

export const { setToggleDrawer, setIsSearchDrawerOpen } = navbarSlice.actions;

export const selectNavbar = (state) => state.navbar;

export default navbarSlice.reducer;
