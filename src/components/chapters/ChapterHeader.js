import {
  Grid,
  useTheme,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import Image from "next/image";
import React, { useRef, useState, forwardRef, useContext } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useSelector as xStateSelector } from "@xstate/react";
import { QuranFont } from "src/constants/QuranReader";
import { selectQuranReaderStyles } from "src/redux/slices/QuranReader/styles";
import { selectTheme } from "src/redux/slices/theme";
import { ThemeTypes } from "src/styles/theme/modes";
import SurahAudioPlayer from "../audio/SurahAudioPlayer";
import Bismillah from "../common/Bismillah";
// import Bismillah from "../common/Bismillah";
import {
  selectIsLoadingCurrentChapter,
  selectIsPlayingCurrentChapter,
} from "src/xstate/actors/audioPlayer/selectors";
import ChapterIconContainer, { ChapterIconsSize } from "./ChapterIconContainer";
import PlayCircleFilledOutlinedIcon from "@mui/icons-material/PlayCircleFilledOutlined";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import ReportIcon from "@mui/icons-material/Report";
import {
  selectAudioState,
  // setIsVisible,
} from "src/redux/slices/AudioPlayer/state";
import { AudioPlayerMachineContext } from "src/xstate/AudioPlayerMachineContext";
import Spinner from "../common/Spinner";

const CHAPTERS_WITHOUT_BISMILLAH = ["1", "9"];

const ChapterHeader = ({
  chapterId,
  pageNumber,
  hizbNumber,
  translationName,
  isTranslationSelected,
}) => {
  const theme = useTheme();
  const audioRef = useRef(null);
  const headerRef = useRef(null);
  const dispatch = useDispatch();
  const [isPlayingState, setIsPlayingState] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { type } = useSelector(selectTheme, shallowEqual);
  const { quranFont } = useSelector(selectQuranReaderStyles, shallowEqual);
  const audioState = useSelector(selectAudioState, shallowEqual);

  const audioService = useContext(AudioPlayerMachineContext);

  const isLoadingCurrentChapter = xStateSelector(audioService, (state) =>
    selectIsLoadingCurrentChapter(state, chapterId)
  );

  const isPlayingCurrentChapter = xStateSelector(audioService, (state) =>
    selectIsPlayingCurrentChapter(state, chapterId)
  );

  const handleVisible = () => {
    setIsVisible(true);
    setIsPlayingState(!isPlayingState);
  };

  const play = () => {
    audioService.send({
      type: "PLAY_SURAH",
      surah: chapterId,
      reciterId: 7,
    });
  };

  const pause = () => {
    audioService.send({
      type: "TOGGLE",
    });
  };

  return (
    <Grid>
      <Grid>
        <Grid
          sx={{
            color:
              type === ThemeTypes.Dark &&
              quranFont === QuranFont.Tajweed &&
              theme.palette.text.secondary,
          }}
        >
          <ChapterIconContainer
            id={chapterId}
            size={ChapterIconsSize.Mega}
            hasSurahPrefix={true}
          />
        </Grid>
      </Grid>
      <div>
        {!CHAPTERS_WITHOUT_BISMILLAH.includes(chapterId) && (
          <Grid container justifyContent="center" mt={2} mb={5}>
            <Bismillah />
          </Grid>
        )}
      </div>
      {isVisible && <SurahAudioPlayer chapterId={chapterId} ref={audioRef} />}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 4,
        }}
        onClick={handleVisible}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ReportIcon sx={{ mr: 1 }} /> <Typography>Surah Info</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {isLoadingCurrentChapter ? (
            <CircularProgress
              style={{ width: "20px", height: "20px", marginRight: "8px" }}
            />
          ) : isPlayingCurrentChapter ? (
            <PauseCircleIcon sx={{ mr: 1 }} onClick={pause} />
          ) : (
            <PlayCircleFilledOutlinedIcon sx={{ mr: 1 }} onClick={play} />
          )}
          <Typography sx={{ textAlign: "end" }}>Play Audio</Typography>
        </Box>
      </Box>
    </Grid>
  );
};

export default ChapterHeader;
