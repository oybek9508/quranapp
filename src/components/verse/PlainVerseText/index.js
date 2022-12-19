import { Grid } from "@mui/material";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import GlyphWord from "src/components/common/QuranWord/GlyphWord";
import TajweedWord from "src/components/common/QuranWord/TajweedWordImage";
import TextWord from "src/components/common/QuranWord/TextWord";
import { QuranFont } from "src/constants/QuranReader";
import { selectQuranReaderStyles } from "src/redux/slices/QuranReader/styles";

// if (quranFont === QuranFont.QPCHafs) {
//     wordText = (
//       <GlyphWord
//         font={font}
//         qpcUthmaniHafs={word.qpcUthmaniHafs}
//         pageNumber={word.pageNumber}
//         textCodeV1={word?.codeV1}
//         textCodeV2={word?.codeV2}
//         isFontLoaded={isFontLoaded}
//       />
//     );
//   } else if (quranFont === QuranFont.Tajweed) {
//     wordText = <TajweedWord path={word.text} alt={word.textUthmani} />;
//   } else if (quranFont === QuranFont.IndoPak) {
//     wordText = (
//       <TextWord font={font} text={word.text} charType={word.charTypeName} />
//     );
//   }

const PlainVerseText = ({ words }) => {
  const quranReaderStyles = useSelector(selectQuranReaderStyles, shallowEqual);
  const { quranFont } = quranReaderStyles;

  const isFontLoaded = false;
  return (
    <Grid sx={{ display: "block" }}>
      <Grid
        container
        alignItems="center"
        direction="row-reverse"
        flexWrap="wrap"
      >
        {words?.map((word) => {
          if (quranFont === QuranFont.QPCHafs) {
            return (
              <Grid key={word.id} sx={{ fontFamily: "UthmanicHafs" }}>
                <GlyphWord
                  font={quranFont}
                  qpcUthmaniHafs={word.qpcUthmaniHafs}
                  pageNumber={word.pageNumber}
                  textCodeV1={word?.codeV1}
                  textCodeV2={word?.codeV2}
                  isFontLoaded={isFontLoaded}
                />
              </Grid>
            );
          }
          if (quranFont === QuranFont.Tajweed) {
            return (
              <Grid key={word.id}>
                <TajweedWord path={word.text} alt={word.textUthmani} />
              </Grid>
            );
          }
          return (
            <Grid
              key={word.id}
              sx={{ fontFamily: "IndoPak", fontSize: "2.5rem" }}
            >
              <TextWord
                font={quranFont}
                text={word.text}
                charType={word.charTypeName}
              />
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default PlainVerseText;
