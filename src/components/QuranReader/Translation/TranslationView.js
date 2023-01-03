import React, { useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import { getNumberOfPages } from "../utils/page";
import AyahList from "./AyahList";
import AyahItem from "./AyahItem";
import TranslationHeader from "./Header";
import { Grid } from "@mui/material";
import TranslationPage from "./TranslationPage";
import useGetQueryParamOrReduxValue from "src/hooks/useGetQueryParamOrReduxValue";
import QueryParam from "src/constants/QuranParam";
// import { useSingleChapterTranslation } from "src/api/quran-translation";

const INCREASE_VIEWPORT_BY_PIXELS = 1000;

const TranslationView = ({
  initialData,
  resourceId,
  quranReaderType,
  quranReaderStyles,
  wordByWordLocale = false,
}) => {
  const [apiPageToVersesMap, setApiPageToVersesMap] = useState({
    1: initialData.verses,
  });

  const virtuosoRef = useRef(null);

  const numberOfPages = useMemo(
    () =>
      getNumberOfPages(
        initialData.metaData.numberOfVerses,
        initialData.pagination.perPage
      ),
    [initialData.metaData.numberOfVerses, initialData.pagination.perPage]
  );

  const {
    value: selectedTranslations,
    // isQueryParamDifferent: translationsQueryParamDifferent,
  } = useGetQueryParamOrReduxValue(QueryParam.Translations);

  const verses = useMemo(
    () => Object.values(apiPageToVersesMap).flat(),
    [apiPageToVersesMap]
  );

  const itemContentRenderer = (currentPageIndex) => {
    return (
      <TranslationPage
        pageNumber={currentPageIndex + 1}
        quranReaderType={quranReaderType}
        quranReaderStyles={quranReaderStyles}
        setApiPageToVersesMap={setApiPageToVersesMap}
        selectedTranslations={selectedTranslations}
        wordByWordLocale={wordByWordLocale}
        // reciterId={reciterId}
        initialData={initialData}
        resourceId={resourceId}
      />
    );
  };

  return (
    <Grid sx={{ width: "100%" }}>
      {/* <TranslationHeader initialData={initialData} />
      <AyahList initialData={initialData} value={value} /> */}
      <Grid>
        <Virtuoso
          ref={virtuosoRef}
          useWindowScroll
          totalCount={numberOfPages}
          increaseViewportBy={INCREASE_VIEWPORT_BY_PIXELS}
          initialItemCount={1} // needed for SSR.
          itemContent={itemContentRenderer}
          // components={{
          //   Footer: () => (
          //     <EndOfScrollingControls
          //       quranReaderDataType={quranReaderDataType}
          //       lastVerse={verses[verses.length - 1]}
          //       initialData={initialData}
          //     />
          //   ),
          // }}
        />
      </Grid>
    </Grid>
  );
};

export default TranslationView;
