import { useEffect, memo, useContext } from "react";
import { useSelector as useSelectorXstate } from "@xstate/react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import TranslationText from "./TranslationText";

import {
  verseFontChanged,
  verseTranslationChanged,
  verseTranslationFontChanged,
} from "../utils/memoization";
import { Box, Divider, Grid, Typography, useTheme } from "@mui/material";
import { AudioPlayerMachineContext } from "src/xstate/AudioPlayerMachineContext";
import { getVerseWords, makeVerseKey } from "src/utils/verse";
import VerseText from "src/components/verse/VerseText";

import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import PlayVerseAudioButton from "src/components/verse/PlayVerseAudioButton";

const TranslationViewCell = (props) => {
  const theme = useTheme();
  const { verseIndex, verse, quranReaderStyles } = props;
  const router = useRouter();
  const { startingVerse } = router.query;
  const audioService = useContext(AudioPlayerMachineContext);

  const isHighlighted = useSelectorXstate(audioService, (state) => {
    const { ayahNumber, surah } = state.context;
    return makeVerseKey(surah, ayahNumber) === verse.verseKey;
  });

  console.log("verse", verse);
  return (
    <Grid sx={{ bgcolor: isHighlighted && "yellow" }}>
      <Grid
        container
        justifyContent="space-between"
        direction="row"
        py={5}
        px={2}
      >
        <Grid
          container
          item
          direction="column"
          justifyContent="space-between"
          md={1}
          sx={{ color: theme.palette.grey[600] }}
        >
          <Typography>{verse.verseKey}</Typography>
          {/* <PlayCircleFilledWhiteOutlinedIcon /> */}
          <PlayVerseAudioButton
            verseKey={verse.verseKey}
            timestamp={verse.timestamps.timestampFrom}
          />
          <MenuBookOutlinedIcon />
          <MoreHorizOutlinedIcon />
        </Grid>
        <Grid container item md={11}>
          <Grid container direction="row-reverse" py={2} flexWrap="wrap">
            <VerseText words={getVerseWords(verse)} />
          </Grid>
          <Grid py={2}>
            {verse.translations?.map((translation) => (
              <div key={translation.id}>
                <TranslationText
                  translationFontScale={quranReaderStyles.translationFontScale}
                  text={translation.text}
                  languageId={translation.languageId}
                  resourceName={
                    verse.translations?.length > 1
                      ? translation.resourceName
                      : null
                  }
                />
              </div>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Divider sx={{ bgcolor: theme.palette.text.secondary }} />
    </Grid>
  );
};

export default TranslationViewCell;
