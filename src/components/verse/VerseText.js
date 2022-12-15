import { WifiPasswordOutlined } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { useMemo, useRef } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { FALLBACK_FONT } from "src/constants/QuranReader";
import { selectQuranReaderStyles } from "src/redux/slices/QuranReader/styles";
import { getFontClassName, isQCFFont } from "src/utils/fontFaceHelper";
import { getFirstWordOfSurah } from "src/utils/verse";
import GlyphWord from "../common/QuranWord/GlyphWord";
import QuranWord from "../common/QuranWord/QuranWord";
import isCenterAlignedPage from "./pageUtils";

const VerseText = ({ words, isReadingMode = false, isFontLoaded = true }) => {
  const textRef = useRef(null);
  const { quranFont, quranTextFontScale, mushafLines } = useSelector(
    selectQuranReaderStyles,
    shallowEqual
  );

  const isBigTextLayout = isReadingMode && quranTextFontScale > 3;

  const [firstWord] = words;
  const { lineNumber, pageNumber, location, verseKey, hizbNumber } = firstWord;

  const centerAlignPage = useMemo(
    () => isCenterAlignedPage(pageNumber, lineNumber, quranFont),
    [pageNumber, lineNumber, quranFont]
  );

  const firstWordData = getFirstWordOfSurah(location);

  const fontClassName = isFontLoaded
    ? getFontClassName(quranFont, quranTextFontScale, mushafLines)
    : getFontClassName(FALLBACK_FONT, quranTextFontScale, mushafLines, true);

  return (
    <Grid sx={{ display: isBigTextLayout ? "inline" : "block" }}>
      <Grid
        alignItems="center"
        justifyContent={
          centerAlignPage && isReadingMode ? "center" : "space-between"
        }
        flexDirection="row-reverse"
        flexWrap={isReadingMode && "wrap"}
        sx={{
          display: isBigTextLayout ? "inline" : "flex",
          lineHeight: "normal",
          fontSize: "2.5rem",
          fontFamily: "UthmanicHafs",
          fontWeight: 500,
        }}
      >
        {words?.map((word) => (
          <QuranWord key={word.location} word={word} font={quranFont} />
        ))}
      </Grid>
    </Grid>
  );
};

export default VerseText;
