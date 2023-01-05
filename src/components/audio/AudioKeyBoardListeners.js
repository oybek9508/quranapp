import { useCallback, useContext } from "react";

import { useHotkeys, Options } from "react-hotkeys-hook";

import { AudioPlayerMachineContext } from "src/xstate/AudioPlayerMachineContext";

const AudioKeyBoardListeners = ({ togglePlaying, isAudioPlayerHidden }) => {
  const audioService = useContext(AudioPlayerMachineContext);
  const toggleAudioPlayer = useCallback(
    (event) => {
      event.preventDefault();
      togglePlaying();
    },
    [togglePlaying]
  );
  const seekForward = (event) => {
    event.preventDefault();
    audioService.send({ type: "NEXT_AYAH" });
  };
  const seekBackwards = (event) => {
    event.preventDefault();
    audioService.send({ type: "PREV_AYAH" });
  };

  const options = { enabled: !isAudioPlayerHidden };
  useHotkeys("space", toggleAudioPlayer, options, [togglePlaying]);
  useHotkeys("right", seekForward, options);
  useHotkeys("left", seekBackwards, options);
  return <></>;
};

export default AudioKeyBoardListeners;
