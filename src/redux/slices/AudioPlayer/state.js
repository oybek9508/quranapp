import { createSlice } from "@reduxjs/toolkit";
import SliceName from "src/redux/constants/SliceNames";
import { getAudioPlayerStateInitialState } from "src/redux/defaultSettings/util";

const audioSlice = createSlice({
  name: SliceName.AUDIO_PLAYER_STATE,
  initialState: getAudioPlayerStateInitialState(),
  reducers: {
    setIsVisible: (state, action) => {
      state.isVisible = action.payload;
    },
  },
});

export const { setIsVisible } = audioSlice.actions;
export const selectAudioState = (state) => state.audioPlayerState;
export default audioSlice.reducer;
