import { useContext } from "react";

import { useSelector } from "@xstate/react";

// import OverflowAudioPlayerActionsMenu from "./OverflowAudioPlayerActionsMenu";
// import RepeatAudioButton from "./RepeatButton";
// import SeekButton, { SeekButtonType } from "./SeekButton";

import { selectIsLoading } from "src/xstate/actors/audioPlayer/selectors";
import { AudioPlayerMachineContext } from "src/xstate/AudioPlayerMachineContext";
import PlayPauseButton from "./Button/PlayPauseButton";

const PlaybackControls = () => {
  const audioService = useContext(AudioPlayerMachineContext);
  const isLoading = useSelector(audioService, selectIsLoading);

  return (
    <div>
      {/* <div>
        <RepeatAudioButton isLoading={isLoading} />
      </div>
      <div>
        <SeekButton type={SeekButtonType.PrevAyah} isLoading={isLoading} />
      </div>
      <div>
        <PlayPauseButton />
      </div>
      <div>
        <SeekButton type={SeekButtonType.NextAyah} isLoading={isLoading} />
      </div>
      <div>
        <OverflowAudioPlayerActionsMenu />
      </div> */}
    </div>
  );
};

export default PlaybackControls;
