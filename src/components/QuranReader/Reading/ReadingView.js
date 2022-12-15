import { useEffect, useRef, useState, useMemo } from "react";
import { useRouter } from "next/router";
import { BASE_URL } from "/src/api/api";
import { useSingleSurah } from "/src/api/quran-chapter-api";
import Header from "/src/components/layout/Header";
import { Box, Card, CardMedia, Grid, Typography } from "@mui/material";
import { useUthmaniScript, useUthmaniTajweedScript } from "/src/api/quran-api";
import { useChaperAudioForEachAyah } from "/src/api/quran-audio-api";
import Order from "/src/components/ayah/Order";
import SingleAyahPlayer from "/src/components/audio/SingleAyahPlayer";
import ReadingPreferenceTab from "../ReadingPreferenceTab";
import Image from "next/image";
import { VapeFreeSharp } from "@mui/icons-material";
import { Virtuoso } from "react-virtuoso";
import useFetchPagesLookup from "src/hooks/useFetchPagesLookup";
import PageContainer from "./PageContainer";

const INCREASE_VIEWPORT_BY_PIXELS = 1200;

const ReadingView = (props) => {
  // console.log("props reading", props);
  const {
    quranReaderStyles,
    initialData,
    resourceId,
    quranReaderType,
    isReadingPreference,
  } = props;
  const virtuosoRef = useRef(null);
  const [mushafPageToVersesMap, setMushafPageToVersesMap] = useState({
    [initialData.verses[0].pageNumber]: initialData.verses,
  });

  const verses = useMemo(
    () => Object.values(mushafPageToVersesMap).flat(),
    [mushafPageToVersesMap]
  );

  // useQcfFont(quranFont, verses);
  const { pagesCount, hasError, pagesVersesRange, isLoading } =
    useFetchPagesLookup(
      resourceId,
      quranReaderType,
      initialData,
      quranReaderStyles
      // isUsingDefaultFont
    );

  const { quranFont, mushafLines, quranTextFontScale } = quranReaderStyles;

  const itemContentRenderer = (pageIndex) => (
    <PageContainer
      // isUsingDefaultFont={isUsingDefaultFont}
      pagesVersesRange={pagesVersesRange}
      quranReaderStyles={quranReaderStyles}
      // reciterId={reciterId}
      // lang={lang}
      // wordByWordLocale={wordByWordLocale}
      pageIndex={pageIndex}
      setMushafPageToVersesMap={setMushafPageToVersesMap}
      initialData={initialData}
    />
  );

  return (
    <Grid sx={{ px: { xs: 0, sm: 3 }, mt: 4 }}>
      <Virtuoso
        totalCount={pagesCount}
        useWindowScroll
        increaseViewportBy={INCREASE_VIEWPORT_BY_PIXELS}
        initialItemCount={1}
        itemContent={
          itemContentRenderer
          // () => (
          // <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          //   <span style={{ wordBreak: "break-all" }}>
          //     {initialData?.verses?.map((verse, idx) => (
          //       <Typography
          //         variant="span"
          //         key={verse?.id}
          //         onClick={() => {
          //           console.log("audioData?.audio_files?[idx]");
          //         }}
          //       >
          //         <Typography
          //           variant="span"
          //           key={verse?.id}
          //           sx={{
          //             fontSize: { xs: "24px", sm: "36px" },
          //             fontWeight: 600,
          //             fontFamily: "UthmanicHafs",
          //           }}
          //         >
          //           {verse?.textUthmani}
          //         </Typography>
          //         <span>
          //           <Order number={verse?.verseNumber} />
          //         </span>
          //       </Typography>
          //     ))
          //     </span>
          //   </Box>
          // )
        }
      />
    </Grid>
  );
};

export default ReadingView;
