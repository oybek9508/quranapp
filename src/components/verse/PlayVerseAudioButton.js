import React, { useContext } from "react";
import { useSelector as useXstateSelector } from "@xstate/react";
import { Button, CircularProgress } from "@mui/material";
import PlayCircleFilledOutlinedIcon from "@mui/icons-material/PlayCircleFilledOutlined";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import QueryParam from "src/constants/QuranParam";
import { getChapterData } from "src/utils/chapters";
import {
  getChapterNumberFromKey,
  getVerseNumberFromKey,
} from "src/utils/verse";
import DataContext from "src/context/DataContext";
import { selectIsVerseLoading } from "src/xstate/actors/audioPlayer/selectors";
import { AudioPlayerMachineContext } from "src/xstate/AudioPlayerMachineContext";
import useGetQueryParamOrXstateValue from "src/hooks/useGetQueryParamOrXstateValue";

const PlayVerseAudioButton = ({
  verseKey,
  isTranslationView = true,
  onActionTriggered,
}) => {
  const audioService = useContext(AudioPlayerMachineContext);
  const {
    value: reciterId,
    isQueryParamDifferent: reciterQueryParamDifferent,
  } = useGetQueryParamOrXstateValue(QueryParam.Reciter);

  const isVerseLoading = useXstateSelector(audioService, (state) =>
    selectIsVerseLoading(state, verseKey)
  );
  const chapterId = getChapterNumberFromKey(verseKey);
  const verseNumber = getVerseNumberFromKey(verseKey);
  const chaptersData = useContext(DataContext);
  const chapterData = getChapterData(chaptersData, chapterId.toString());

  const onPlayClicked = () => {
    audioService.send({
      type: "PLAY_AYAH",
      surah: chapterId,
      ayahNumber: verseNumber,
      reciterId: reciterQueryParamDifferent ? reciterId : undefined,
    });

    if (onActionTriggered) {
      onActionTriggered();
    }
  };

  if (isVerseLoading) {
    return (
      <Button>
        <CircularProgress
          style={{ width: "20px", height: "20px", marginRight: "8px" }}
        />
      </Button>
    );
  }

  return (
    // <Button onClick={onPlayClicked} disableRipple sx={{ mx: 0 }}>
    <PlayCircleFilledOutlinedIcon onClick={onPlayClicked} />
    // </Button>
  );
};

export default PlayVerseAudioButton;
