import { useContext } from "react";

import { useSelector } from "@xstate/react";

// import OverflowAudioPlayerActionsMenu from "./OverflowAudioPlayerActionsMenu";
// import RepeatAudioButton from "./RepeatButton";

import { selectIsLoading } from "src/xstate/actors/audioPlayer/selectors";
import { AudioPlayerMachineContext } from "src/xstate/AudioPlayerMachineContext";
import SeekButton, { SeekButtonType } from "./SeekButton";
import PlayPauseButton from "./Button/PlayPauseButton";
import { Grid } from "@mui/material";

const PlaybackControls = () => {
  const audioService = useContext(AudioPlayerMachineContext);
  const isLoading = useSelector(audioService, selectIsLoading);

  return (
    <Grid container justifyContent="center" alignItems="center">
      {/* <div>
        <RepeatAudioButton isLoading={isLoading} />
      </div> */}
      <div>
        <SeekButton type={SeekButtonType.PrevAyah} isLoading={isLoading} />
      </div>
      <Grid sx={{ marginInlineStart: 0, marginInlineEnd: 0 }}>
        <PlayPauseButton />
      </Grid>
      <div>
        <SeekButton type={SeekButtonType.NextAyah} isLoading={isLoading} />
      </div>
    </Grid>
  );
};

export default PlaybackControls;
