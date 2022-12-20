import { Grid, useTheme, Box, Typography } from "@mui/material";
import Image from "next/image";
import React, { useRef, useState, forwardRef } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { QuranFont } from "src/constants/QuranReader";
import { selectQuranReaderStyles } from "src/redux/slices/QuranReader/styles";
import { selectTheme } from "src/redux/slices/theme";
import { ThemeTypes } from "src/styles/theme/modes";
import SurahAudioPlayer from "../audio/SurahAudioPlayer";
import Bismillah from "../common/Bismillah";
// import Bismillah from "../common/Bismillah";
import ChapterIconContainer, { ChapterIconsSize } from "./ChapterIconContainer";
import PlayCircleFilledOutlinedIcon from "@mui/icons-material/PlayCircleFilledOutlined";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import {
  selectAudioState,
  // setIsVisible,
} from "src/redux/slices/AudioPlayer/state";

const CHAPTERS_WITHOUT_BISMILLAH = ["1", "9"];

const ChapterHeader = ({
  chapterId,
  pageNumber,
  hizbNumber,
  translationName,
  isTranslationSelected,
}) => {
  const audioRef = useRef(null);
  const dispatch = useDispatch();
  const headerRef = useRef(null);
  const theme = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { type } = useSelector(selectTheme, shallowEqual);
  const { quranFont } = useSelector(selectQuranReaderStyles, shallowEqual);
  const audioState = useSelector(selectAudioState, shallowEqual);

  const handleVisible = () => {
    setIsVisible(true);
    setIsPlaying(true);
  };

  console.log("audioRef", audioRef.current.audio.current);
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
          sx={{ mr: 1, display: isPlaying && "none" }}
          onClick={() => audioRef.current.audio.current.play()}
        />

        <PauseCircleIcon
          sx={{ mr: 1, display: !isPlaying && "none" }}
          onClick={() => audioRef.current.audio.current.pause()}
        />

        <Typography sx={{ textAlign: "end" }}>Play Audio</Typography>
      </Box>
    </div>
  );
};

export default ChapterHeader;
