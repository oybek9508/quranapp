import { Grid } from "@mui/material";
import { useMemo } from "react";
import constants from "src/styles/theme/constants";
import groupLinesByVerses from "./groupLinesByVerses";
import Line from "./Line";
import PageFooter from "./PageFooter";

const Page = (props) => {
  const { verses, pageNumber, quranReaderStyles, pageIndex } = props;
  const lines = useMemo(
    () => (verses && verses.length ? groupLinesByVerses(verses) : {}),
    [verses]
  );

  const { quranTextFontScale, quranFont, mushafLines } = quranReaderStyles;

  return (
    <Grid
      id={`page-${pageNumber}`}
      sx={(theme) => {
        return {
          maxWidth: "100%",
          width: "73.5vh",
          borderBlockEnd: "1px gray solid",
          marginBlockStart: constants.readingViewContainerTopMargin,
        };
      }}
    >
      {Object.keys(lines).map((key, lineIndex) => (
        <Line
          pageIndex={pageIndex}
          lineIndex={lineIndex}
          lineKey={key}
          words={lines[key]}
          key={key}
          //   isBigTextLayout={isBigTextLayout}
          quranReaderStyles={quranReaderStyles}
        />
      ))}
      <PageFooter page={pageNumber} />
    </Grid>
  );
};

export default Page;
