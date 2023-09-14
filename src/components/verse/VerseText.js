import { WifiPasswordOutlined } from "@mui/icons-material";
import { Grid, useTheme } from "@mui/material";
import { useMemo, useRef } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { FALLBACK_FONT, QuranFont } from "src/constants/QuranReader";
import {
  selectReadingViewSelectedVerseKey,
  selectReadingViewHoveredVerseKey,
} from "src/redux/slices/QuranReader/readingViewVerse";
import { selectQuranReaderStyles } from "src/redux/slices/QuranReader/styles";
import { getFontClassName, isQCFFont } from "src/utils/fontFaceHelper";
import { getFirstWordOfSurah } from "src/utils/verse";
import GlyphWord from "../common/QuranWord/GlyphWord";
import QuranWord from "../common/QuranWord/QuranWord";
import isCenterAlignedPage from "./pageUtils";

const VerseText = ({
  words,
  isReadingMode = false,
  isFontLoaded = true,
  isHighlighted,
}) => {
  const theme = useTheme();
  const textRef = useRef(null);
  const hoveredVerseKey = useSelector(
    selectReadingViewHoveredVerseKey,
    shallowEqual
  );

  const selectedVerseKey = useSelector(
    selectReadingViewSelectedVerseKey,
    shallowEqual
  );

  const { quranFont, quranTextFontScale, mushafLines } = useSelector(
    selectQuranReaderStyles,
    shallowEqual
  );

  const [firstWord] = words;
  const { lineNumber, pageNumber, location, verseKey, hizbNumber } = firstWord;

  const centerAlignPage = useMemo(
    () => isCenterAlignedPage(pageNumber, lineNumber, quranFont),
    [pageNumber, lineNumber, quranFont]
  );

  const firstWordData = getFirstWordOfSurah(location);
  const { chapterId } = firstWordData;
  const isTajweedFont = quranFont === QuranFont.Tajweed;
  const isBigTextLayout = isReadingMode && quranTextFontScale > 3;

  const fontClassName = isFontLoaded
    ? getFontClassName(quranFont, quranTextFontScale, mushafLines)
    : getFontClassName(FALLBACK_FONT, quranTextFontScale, mushafLines, true);

  return (
    <Grid
      data-page={pageNumber}
      data-chapter-id={chapterId}
      data-hizb={hizbNumber}
      sx={{
        display: isBigTextLayout ? "inline" : "block",
        bgcolor: isHighlighted && theme.palette.background.paper,
      }}
    >
      <Grid
        translate="no"
        alignItems="center"
        justifyContent={
          centerAlignPage && isReadingMode
            ? "center"
            : isReadingMode
            ? "space-between"
            : "space-end"
        }
        flexDirection="row-reverse"
        flexWrap={"wrap"}
        sx={{
          display: isBigTextLayout ? "inline" : "flex",
          lineHeight: "normal",
          fontSize: "0.5rem",
          fontFamily: "UthmanicHafs",
          fontSmooth: "auto",
          letterSpacing: "initial",
          // fontWeight: 600,
        }}
      >
        {words?.map((word) => (
          <QuranWord
            key={word.location}
            word={word}
            font={quranFont}
            isHighlighted={word.verseKey === selectedVerseKey}
            shouldShowSecondaryHighlight={word.verseKey === hoveredVerseKey}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default VerseText;
