import { useContext } from "react";

import { useSelector } from "@xstate/react";

import PlayCircleFilledOutlinedIcon from "@mui/icons-material/PlayCircleFilledOutlined";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import { selectIsLoading } from "src/xstate/actors/audioPlayer/selectors";
import { AudioPlayerMachineContext } from "src/xstate/AudioPlayerMachineContext";
import Spinner from "src/components/common/Spinner";
import { withStopPropagation } from "src/utils/event";
import CircularProgress from "src/components/common/CircularProgress";
import { Button } from "@mui/material";

const PlayPauseButton = () => {
  const audioService = useContext(AudioPlayerMachineContext);

  const isPlaying = useSelector(audioService, (state) =>
    state.matches("VISIBLE.AUDIO_PLAYER_INITIATED.PLAYING")
  );
  //   const isLoading = useSelector(audioService, selectIsLoading);

  //   if (isLoading) {
  //     return <CircularProgress />;
  //   }
  if (isPlaying) {
    return (
      <Button
        onClick={withStopPropagation(() => {
          audioService.send("TOGGLE");
        })}
      >
        <PauseCircleIcon sx={{ fontSize: "2.0rem" }} />
      </Button>
    );
  }
  return (
    <Button
      onClick={withStopPropagation(() => {
        audioService.send("TOGGLE");
      })}
    >
      <PlayCircleFilledOutlinedIcon sx={{ fontSize: "2.0rem" }} />
    </Button>
  );
};

export default PlayPauseButton;
