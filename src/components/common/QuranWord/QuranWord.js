import { Grid, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import ReadingViewWordPopover from "src/components/QuranReader/Reading/ReadingViewWordPopover";
import { ReadingPreference } from "src/constants/QuranReader";
import { selectReadingPreferences } from "src/redux/slices/QuranReader/readingPreferences";
import { isQCFFont } from "src/utils/fontFaceHelper";
import { makeWordLocation } from "src/utils/verse";
import GlyphWord from "./GlyphWord";

const Wrapper = ({ children, shouldWrap, wrapper }) =>
  shouldWrap ? wrapper(children) : children;

const QuranWord = (props) => {
  console.log("props", props);
  const { word, font, isFontLoaded = true } = props;

  const readingPreference = useSelector(selectReadingPreferences);
  const wordLocation = makeWordLocation(word.verseKey, word.position);
  let wordText = null;

  if (isQCFFont(font)) {
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
  }

  console.log("wordText", wordText);
  return (
    <Grid sx={{ bgcolor: "red" }}>
      <Wrapper
        shouldWrap
        wrapper={(children) =>
          readingPreference === ReadingPreference.Translation ? (
            <div>Translation</div>
          ) : (
            <ReadingViewWordPopover>
              {word.verse.textUthmani}
            </ReadingViewWordPopover>
          )
        }
      >
        {wordText}
      </Wrapper>
    </Grid>
  );
};

export default QuranWord;
