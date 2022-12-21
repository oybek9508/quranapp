import { Grid, useTheme, Box, Typography } from "@mui/material";
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
import { selectIsPlayingCurrentChapter } from "src/xstate/actors/audioPlayer/selectors";
import ChapterIconContainer, { ChapterIconsSize } from "./ChapterIconContainer";
import PlayCircleFilledOutlinedIcon from "@mui/icons-material/PlayCircleFilledOutlined";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import {
  selectAudioState,
  // setIsVisible,
} from "src/redux/slices/AudioPlayer/state";
import { AudioPlayerMachineContext } from "src/xstate/AudioPlayerMachineContext";

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

  // const isLoadingCurrentChapter = xStateSelector(audioService, (state) =>
  //   selectIsLoadingCurrentChapter(state, chapterId)
  // );

  // const isPlayingCurrentChapter = xStateSelector(audioService, (state) =>
  //   selectIsPlayingCurrentChapter(state, chapterId)
  // );

  const handleVisible = () => {
    setIsVisible(true);
    setIsPlayingState(!isPlayingState);
  };

  const play = () => {
    // logButtonClick("chapter_header_play_audio");
    audioService.send({
      type: "PLAY_SURAH",
      surah: chapterId,
      reciterId: 7,
    });
  };

  const pause = () => {
    // logButtonClick("chapter_header_pause_audio");
    audioService.send({
      type: "TOGGLE",
    });
  };

  const playPause = () => {
    let isPlaying = isPlayingState;
    console.log("isPlaying", isPlaying);
    if (isPlaying) {
      audioRef?.current?.audio?.current?.pause();
    } else {
      audioRef?.current?.audio?.current?.play();
    }
    setIsPlayingState(!isPlaying);
  };

  // console.log("audioRef", audioRef.current.audio.current);
  return (
    <div>
      <div>
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
      </div>
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
          justifyContent: "end",
        }}
        onClick={handleVisible}
      >
        <PlayCircleFilledOutlinedIcon
          sx={{ mr: 1, display: isPlayingState && "none" }}
          onClick={play}
        />

        <PauseCircleIcon
          sx={{ mr: 1, display: !isPlayingState && "none" }}
          onClick={pause}
        />

        <Typography sx={{ textAlign: "end" }}>Play Audio</Typography>
      </Box>
    </div>
  );
};

export default ChapterHeader;
