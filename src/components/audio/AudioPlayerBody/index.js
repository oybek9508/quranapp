import React, { useContext } from "react";

import { useSelector } from "@xstate/react";

import AudioKeyBoardListeners from "../AudioKeyboardListeners";
import AudioPlayerSlider from "../AudioPlayerSlider";
import PlaybackControls from "../PlaybackControls";
import RadioPlaybackControl from "../RadioPlaybackControl";

import { AudioPlayerMachineContext } from "src/xstate/AudioPlayerMachineContext";
import { Grid } from "@mui/material";

const AudioPlayerBody = () => {
  const audioService = useContext(AudioPlayerMachineContext);
  const isRadioMode = useSelector(
    audioService,
    (state) => !!state.context.radioActor
  );

  return (
    <>
      <Grid container alignItems="center" px={2}>
        <AudioKeyBoardListeners
          togglePlaying={() => audioService.send("TOGGLE")}
          isAudioPlayerHidden={false}
        />
        {!isRadioMode && (
          <Grid container alignItems="center" sx={{ width: "100%" }}>
            <AudioPlayerSlider />
          </Grid>
        )}
      </Grid>
      {isRadioMode ? (
        <RadioPlaybackControl
          radioActor={audioService.getSnapshot().context.radioActor}
        />
      ) : (
        <PlaybackControls />
      )}
    </>
  );
};

export default AudioPlayerBody;
