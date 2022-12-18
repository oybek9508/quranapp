import { useMemo, useRef, useEffect, useState } from "react";
import { getPageNumberByPageIndex } from "src/utils/page";
import { getReaderViewRequestKey, verseFetcher } from "../api";
import { useSelector } from "react-redux";
import useSWRImmutable from "swr/immutable";
import Page from "./Page";
import { Grid } from "@mui/material";

const getPageVersesRange = (currentMushafPage, apiPagesVersesRange) => {
  const lookupRecord = { ...apiPagesVersesRange[currentMushafPage] };
  // we remove firstVerseKey and lastVerseKey before we send the params to BE as BE doesn't need them
  delete lookupRecord.firstVerseKey;
  delete lookupRecord.lastVerseKey;
  return lookupRecord;
};

const getInitialVerses = (pageNumber, initialVerses) =>
  initialVerses.map((verse) => ({
    ...verse,
    words: verse.words.filter((word) => word.pageNumber === pageNumber),
  }));

const PageContainer = (props) => {
  const {
    pagesVersesRange,
    quranReaderStyles,
    // reciterId,
    // lang,
    wordByWordLocale = false,
    pageIndex,
    setMushafPageToVersesMap,
    initialData,
    isUsingDefaultFont,
  } = props;

  const pageNumber = useMemo(
    () => getPageNumberByPageIndex(pageIndex, pagesVersesRange),
    [pageIndex, pagesVersesRange]
  );
  const initialVerses = useMemo(
    () =>
      pageIndex === 0
        ? getInitialVerses(pageNumber, initialData.verses)
        : initialData.verses,
    [initialData.verses, pageIndex, pageNumber]
  );

  // const shouldUseInitialData = pageIndex === 0 && false && true && true;

  const { data: verses, isValidating } = useSWRImmutable(
    getReaderViewRequestKey({
      pageNumber,
      pageVersesRange: getPageVersesRange(pageNumber, pagesVersesRange),
      quranReaderStyles: { ...quranReaderStyles, quranFont: "tajweed" },
      reciter: 7,
      locale: "en",
      wordByWordLocale,
    }),
    verseFetcher
    // {
    //   fallbackData: shouldUseInitialData ? initialVerses : null,
    //   revalidateOnMount: !shouldUseInitialData,
    // }
  );

  console.log("verses", verses);
  // console.log("shouldUseInitialData", shouldUseInitialData);
  console.log("quranReaderStyles", quranReaderStyles);

  useEffect(() => {
    if (verses) {
      // @ts-ignore
      setMushafPageToVersesMap((prevMushafPageToVersesMap) => ({
        ...prevMushafPageToVersesMap,
        [pageNumber]: verses,
      }));
    }
  }, [pageNumber, setMushafPageToVersesMap, verses]);

  if (!verses || isValidating) {
    return <div>Error</div>;
  }

  return (
    <Grid container justifyContent="center">
      <Page
        verses={verses}
        key={`page-${pageNumber}`}
        pageNumber={Number(pageNumber)}
        quranReaderStyles={quranReaderStyles}
        pageIndex={pageIndex}
      />
    </Grid>
  );
};

export default PageContainer;
