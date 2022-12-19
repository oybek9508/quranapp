import { Grid } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import GlyphWord from "src/components/common/QuranWord/GlyphWord";
import TajweedWord from "src/components/common/QuranWord/TajweedWordImage";
import TextWord from "src/components/common/QuranWord/TextWord";
import PlainVerseText from "src/components/verse/PlainVerseText";
import { QuranFont, QuranReaderDataType } from "src/constants/QuranReader";
import { selectQuranReaderStyles } from "src/redux/slices/QuranReader/styles";
import getSampleVerse from "src/utils/sampleVerse";
import useSWR from "swr";

const SWR_SAMPLE_VERSE_KEY = "sample-verse";

const fetcher = (url) => fetch(url).then((res) => res.json());

const FontPreview = (props) => {
  const dispatch = useDispatch();
  const quranReaderStyles = useSelector(selectQuranReaderStyles, shallowEqual);
  const { quranFont } = quranReaderStyles;
  const isTajweed = quranFont === QuranFont.Tajweed;
  const { data: sampleVerse } = useSWR(SWR_SAMPLE_VERSE_KEY, () =>
    getSampleVerse()
  );
  console.log("sampleVerse", sampleVerse);

  let verse;
  if (isTajweed) {
    verse = {
      ...sampleVerse,
      words: sampleVerse.words.map((word) => ({
        ...word,
        text: word.textImage,
      })),
    };
  } else {
    verse = sampleVerse;
  }

  return (
    <Grid mt={4} sx={{ bgcolor: "#1b3a4b", p: 3 }}>
      <PlainVerseText words={verse?.words} />
    </Grid>
  );
};

export default FontPreview;
