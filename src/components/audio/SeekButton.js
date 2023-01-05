import { useContext, useMemo } from "react";
import { useSelector } from "@xstate/react";
import { Button } from "@mui/material";
import FastForwardIcon from "@mui/icons-material/FastForward";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import { AudioPlayerMachineContext } from "src/xstate/AudioPlayerMachineContext";
import DataContext from "src/context/DataContext";
import { getChapterData } from "src/utils/chapters";

export const SeekButtonType = {
  NextAyah: "nextAyah",
  PrevAyah: "prevAyah",
};

const SeekButton = ({ type, isLoading }) => {
  const audioService = useContext(AudioPlayerMachineContext);
  const chaptersData = useContext(DataContext);

  const surah = useSelector(audioService, (state) => state.context.surah);
  const ayahNumber = useSelector(
    audioService,
    (state) => state.context.ayahNumber
  );

  const chapterData = useMemo(
    () => getChapterData(chaptersData, surah?.toString()),
    [chaptersData, surah]
  );

  const onSeek = () => {
    audioService.send({
      type: type === SeekButtonType.NextAyah ? "NEXT_AYAH" : "PREV_AYAH",
    });
  };

  const isDisabled =
    isLoading ||
    (type === SeekButtonType.PrevAyah && ayahNumber <= 1) ||
    (type === SeekButtonType.NextAyah &&
      ayahNumber >= chapterData?.versesCount);

  return (
    <Button onClick={onSeek}>
      {type === SeekButtonType.PrevAyah ? (
        <FastRewindIcon sx={{ fontSize: "2.0rem" }} />
      ) : (
        <FastForwardIcon sx={{ fontSize: "2.0rem" }} />
      )}
    </Button>
  );
};

export default SeekButton;
