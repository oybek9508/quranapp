import { WifiPasswordOutlined } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { useMemo, useRef } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { selectQuranReaderStyles } from "src/redux/slices/QuranReader/styles";
import { isQCFFont } from "src/utils/fontFaceHelper";
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

  console.log("quranTextFontScale", quranTextFontScale);

  const isBigTextLayout = isReadingMode && quranTextFontScale > 3;

  const [firstWord] = words;
  const { lineNumber, pageNumber, location, verseKey, hizbNumber } = firstWord;

  const centerAlignPage = useMemo(
    () => isCenterAlignedPage(pageNumber, lineNumber, quranFont),
    [pageNumber, lineNumber, quranFont]
  );

  const firstWordData = getFirstWordOfSurah(location);

  return (
    <Grid sx={{ display: "inline", width: "60vh" }}>
      <Grid
        alignItems="center"
        justifyContent={
          centerAlignPage && isReadingMode ? "center" : "space-between"
        }
        flexDirection="row-reverse"
        sx={{
          display: isBigTextLayout ? "inline" : "flex",
          lineHeight: 2,
          fontSize: "40px",
          fontFamily: "UthmanicHafs",
          fontWeight: 600,
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
