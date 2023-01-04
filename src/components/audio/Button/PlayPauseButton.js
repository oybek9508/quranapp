import { useContext } from "react";

import { useSelector } from "@xstate/react";

import PlayCircleFilledOutlinedIcon from "@mui/icons-material/PlayCircleFilledOutlined";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import { selectIsLoading } from "src/xstate/actors/audioPlayer/selectors";
import { AudioPlayerMachineContext } from "src/xstate/AudioPlayerMachineContext";
import Spinner from "src/components/common/Spinner";
import { withStopPropagation } from "src/utils/event";

const PlayPauseButton = () => {
  const audioService = useContext(AudioPlayerMachineContext);

  const isPlaying = useSelector(audioService, (state) =>
    state.matches("VISIBLE.AUDIO_PLAYER_INITIATED.PLAYING")
  );
  const isLoading = useSelector(audioService, selectIsLoading);

  if (isLoading) {
    return <Spinner size={SpinnerSize.Large} />;
  }
  if (isPlaying) {
    return (
      <PauseCircleIcon
        onClick={withStopPropagation(() => {
          audioService.send("TOGGLE");
        })}
      />
    );
  }
  return (
    <PlayCircleFilledOutlinedIcon
      onClick={withStopPropagation(() => {
        audioService.send("TOGGLE");
      })}
    />
  );
};

export default PlayPauseButton;
