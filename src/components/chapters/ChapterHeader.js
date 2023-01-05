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
import { useRouter } from "next/router";
import PlayChapterAudioButton from "../QuranReader/PlayChapterAudioButton";

const CHAPTERS_WITHOUT_BISMILLAH = ["1", "9"];

const ChapterHeader = ({
  chapterId,
  pageNumber,
  hizbNumber,
  translationName,
  isTranslationSelected,
}) => {
  const theme = useTheme();
  const router = useRouter();
  const audioRef = useRef(null);
  const headerRef = useRef(null);
  const dispatch = useDispatch();
  const [isPlayingState, setIsPlayingState] = useState(false);
  const { type } = useSelector(selectTheme, shallowEqual);
  const { quranFont } = useSelector(selectQuranReaderStyles, shallowEqual);

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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            p: 1,
            "&:hover": {
              bgcolor: theme.palette.background.paper,
              borderRadius: "5px",
            },
          }}
          onClick={() => router.push(`/surah/${chapterId}/info`)}
        >
          <ReportIcon sx={{ mr: 1 }} /> <Typography>Surah Info</Typography>
        </Box>
        <PlayChapterAudioButton chapterId={Number(chapterId)} />
      </Box>
    </Grid>
  );
};

export default ChapterHeader;
