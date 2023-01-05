import { useContext } from "react";

import { useSelector } from "@xstate/react";

import PlayCircleFilledOutlinedIcon from "@mui/icons-material/PlayCircleFilledOutlined";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import QueryParam from "src/constants/QuranParam";
import {
  selectIsLoadingCurrentChapter,
  selectIsPlayingCurrentChapter,
} from "src/xstate/actors/audioPlayer/selectors";
import { AudioPlayerMachineContext } from "src/xstate/AudioPlayerMachineContext";
import { getChapterData } from "src/utils/chapters";
import useGetQueryParamOrXstateValue from "src/hooks/useGetQueryParamOrXstateValue";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import DataContext from "src/context/DataContext";

const PlayChapterAudioButton = ({ chapterId }) => {
  const chaptersData = useContext(DataContext);
  const chapterData = getChapterData(chaptersData, chapterId.toString());

  const audioService = useContext(AudioPlayerMachineContext);
  const isLoadingCurrentChapter = useSelector(audioService, (state) =>
    selectIsLoadingCurrentChapter(state, chapterId)
  );
  const isPlayingCurrentChapter = useSelector(audioService, (state) =>
    selectIsPlayingCurrentChapter(state, chapterId)
  );

  const {
    value: reciterId,
    isQueryParamDifferent: reciterQueryParamDifferent,
  } = useGetQueryParamOrXstateValue(QueryParam.Reciter);

  const play = () => {
    audioService.send({
      type: "PLAY_SURAH",
      surah: chapterId,
      reciterId: reciterQueryParamDifferent ? reciterId : undefined,
    });
  };

  const pause = () => {
    audioService.send({
      type: "TOGGLE",
    });
  };

  if (isLoadingCurrentChapter) {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <CircularProgress
          style={{ width: "20px", height: "20px", marginRight: "8px" }}
        />
        <Typography sx={{ textAlign: "end" }}>Loading</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {isPlayingCurrentChapter ? (
        <PauseCircleIcon sx={{ mr: 1 }} onClick={pause} />
      ) : (
        <PlayCircleFilledOutlinedIcon sx={{ mr: 1 }} onClick={play} />
      )}
      <Typography sx={{ textAlign: "end" }}>Play Audio</Typography>
    </Box>
  );
};

export default PlayChapterAudioButton;
