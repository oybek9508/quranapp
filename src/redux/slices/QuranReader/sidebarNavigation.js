import { createSlice } from "@reduxjs/toolkit";
import SliceName from "src/redux/constants/SliceNames";

const initialState = {};

const sidebarNavigation = createSlice({
  name: SliceName.SIDEBAR_NAVIGATION,
  initialState,
  reducers: {},
});

export const {} = sidebarNavigation.actions;

export default sidebarNavigation.reducer;
