import { display } from "@mui/system";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { QuranFont } from "src/constants/QuranReader";
import { selectQuranReaderStyles } from "src/redux/slices/QuranReader/styles";

const getWordText = (
  qpcUthmaniHafs,
  textCodeV1,
  textCodeV2,
  font,
  isFontLoaded
) => {
  if (!isFontLoaded) {
    return qpcUthmaniHafs;
  }
  return font === QuranFont.MadaniV1 ? textCodeV1 : textCodeV2;
};

const GlyphWord = ({
  qpcUthmaniHafs,
  textCodeV1,
  textCodeV2,
  pageNumber,
  font,
  isFontLoaded,
}) => {
  const quranReaderStyles = useSelector(selectQuranReaderStyles, shallowEqual);
  const { quranTextFontScale, mushafLines } = quranReaderStyles;
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: getWordText(
          qpcUthmaniHafs,
          textCodeV1,
          textCodeV2,
          font,
          isFontLoaded
        ),
      }}
      style={{
        fontFamily: !isFontLoaded && "UthmanicHafs !important",
        fontSize: "2.5rem",
      }}
      data-font-scale={quranTextFontScale}
      data-font={font}
      {...(isFontLoaded && {
        style: {
          fontFamily: `p${pageNumber}-${font.replace("code_", "")}`,
        },
      })}
    />
  );
};

export default GlyphWord;
