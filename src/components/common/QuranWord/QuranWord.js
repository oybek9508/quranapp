import { Grid, Typography } from "@mui/material";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import ReadingViewWordPopover from "src/components/QuranReader/Reading/ReadingViewWordPopover";
import { QuranFont, ReadingPreference } from "src/constants/QuranReader";
import { selectReadingPreferences } from "src/redux/slices/QuranReader/readingPreferences";
import { selectQuranReaderStyles } from "src/redux/slices/QuranReader/styles";
import { isQCFFont } from "src/utils/fontFaceHelper";
import { makeWordLocation } from "src/utils/verse";
import GlyphWord from "./GlyphWord";
import TajweedWord from "./TajweedWordImage";
import TextWord from "./TextWord";

const Wrapper = ({ children, shouldWrap, wrapper }) =>
  shouldWrap ? wrapper(children) : children;

const QuranWord = (props) => {
  const { word, font, isFontLoaded } = props;
  const quranReaderStyles = useSelector(selectQuranReaderStyles, shallowEqual);
  const { quranFont } = quranReaderStyles;

  const readingPreference = useSelector(selectReadingPreferences);
  const wordLocation = makeWordLocation(word.verseKey, word.position);
  let wordText = null;

  if (quranFont === QuranFont.QPCHafs) {
    wordText = (
      <GlyphWord
        font={font}
        qpcUthmaniHafs={word.qpcUthmaniHafs}
        pageNumber={word.pageNumber}
        textCodeV1={word?.codeV1}
        textCodeV2={word?.codeV2}
        isFontLoaded={isFontLoaded}
      />
    );
  } else if (quranFont === QuranFont.Tajweed) {
    wordText = <TajweedWord path={word.text} alt={word.textUthmani} />;
  } else if (quranFont === QuranFont.IndoPak) {
    wordText = (
      <TextWord font={font} text={word.text} charType={word.charTypeName} />
    );
  }

  return (
    <Grid>
      {/* <Wrapper
        // shouldWrap
        wrapper={(children) =>
          readingPreference === ReadingPreference.Translation ? (
            <div>Translation</div>
          ) : (
            <ReadingViewWordPopover>{word.textUthmani}</ReadingViewWordPopover>
          )
        }
      > */}
      {wordText}
      {/* </Wrapper> */}
    </Grid>
  );
};

export default QuranWord;
