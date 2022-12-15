import React from "react";
import { getDefaultWordFields } from "src/api/api";
import {
  getChapterIdBySlug,
  getChapterVerses,
} from "src/api/quran-chapter-api";
import { getPagesLookup } from "src/api/quran-page-api";
import ReadingPreferenceTab from "src/components/QuranReader/ReadingPreferenceTab";
import { QuranReaderDataType } from "src/constants/QuranReader";
import DataContext from "src/context/DataContext";
import { getQuranReaderStylesInitialState } from "src/redux/defaultSettings/util";
import { getMushafId } from "src/utils/api";
import { getAllChaptersData, getChapterData } from "src/utils/chapters";
import {
  ONE_WEEK_REVALIDATION_PERIOD_SECONDS,
  REVALIDATION_PERIOD_ON_ERROR_SECONDS,
} from "src/utils/staticPageGeneration";
import {
  getToAndFromFromRange,
  isValidVerseId,
  isValidVerseNumber,
  isValidVerseRange,
} from "src/utils/validator";
import { generateVerseKeysBetweenTwoVerseKeys } from "src/utils/verseKeys";

const VersePage = (props) => {
  console.log("props", props);
  const { chaptersData, chapterResponse, versesResponse, isVerse } = props;

  return (
    <DataContext.Provider value={chaptersData}>
      <ReadingPreferenceTab
        initialData={versesResponse}
        id={chapterResponse.chapter.id}
        quranReaderType={
          isVerse ? QuranReaderDataType.Verse : QuranReaderDataType.VerseRange
        }
      />
    </DataContext.Provider>
  );
};

export const getStaticProps = async ({ params, locale }) => {
  let chapterIdOrSlug = String(params.chapterId);
  const verseIdOrRange = String(params.verseId);
  // 1. make sure the chapter Id/slug is valid using BE since slugs are stored in BE first
  const sluggedChapterId = await getChapterIdBySlug(chapterIdOrSlug, locale);
  if (sluggedChapterId) {
    chapterIdOrSlug = sluggedChapterId;
  }
  const chaptersData = await getAllChaptersData(locale);
  // 2. make sure that verse id/range are valid before calling BE to get the verses.
  if (
    !isValidVerseId(chaptersData, chapterIdOrSlug, verseIdOrRange) &&
    !isValidVerseRange(chaptersData, chapterIdOrSlug, verseIdOrRange)
  ) {
    return { notFound: true };
  }
  /*
    Since we already validated the value, if the verseIdOrRange is a number it means we are
    viewing the verse's page otherwise it's a range page.
  */
  const isVerse = isValidVerseNumber(verseIdOrRange);
  const defaultMushafId = getMushafId(
    getQuranReaderStylesInitialState(locale).quranFont,
    getQuranReaderStylesInitialState(locale).mushafLines
  ).mushaf;
  // common API params between a single verse and range of verses.
  let apiParams = {
    ...getDefaultWordFields(getQuranReaderStylesInitialState(locale).quranFont),
    mushaf: defaultMushafId,
  };
  const metaData = { numberOfVerses: 1 };
  let [from, to] = [null, null];
  if (isVerse) {
    apiParams = { ...apiParams, ...{ page: verseIdOrRange, perPage: 1 } };
  } else {
    const [fromVerseNumber, toVerseNumber] =
      getToAndFromFromRange(verseIdOrRange);
    [from, to] = getToAndFromFromRange(verseIdOrRange).map(
      (ayah) => `${chapterIdOrSlug}:${ayah}`
    );
    apiParams = { ...apiParams, ...{ from, to } };
    metaData.from = from;
    metaData.to = to;
    metaData.numberOfVerses =
      Number(toVerseNumber) - Number(fromVerseNumber) + 1;
  }
  try {
    const pagesLookupResponse = await getPagesLookup({
      chapterNumber: Number(chapterIdOrSlug),
      mushaf: defaultMushafId,
      from: isVerse ? `${chapterIdOrSlug}:${verseIdOrRange}` : metaData.from,
      to: isVerse ? `${chapterIdOrSlug}:${verseIdOrRange}` : metaData.to,
    });

    // if it's range, we need to set the per page as the number of verses of the first page of the range in the actual Mushaf
    if (!isVerse) {
      const firstRangeMushafPage = Object.keys(pagesLookupResponse.pages)[0];
      const firstRangeMushafPageLookup =
        pagesLookupResponse.pages[firstRangeMushafPage];
      const firstRangeMushafPageNumberOfVerses =
        generateVerseKeysBetweenTwoVerseKeys(
          chaptersData,
          firstRangeMushafPageLookup.from,
          firstRangeMushafPageLookup.to
        ).length;
      apiParams = {
        ...apiParams,
        ...{ perPage: firstRangeMushafPageNumberOfVerses },
      };
    }

    const versesResponse = await getChapterVerses(
      chapterIdOrSlug,
      locale,
      apiParams
    );
    // if any of the APIs have failed due to internal server error, we will still receive a response but the body will be something like {"status":500,"error":"Internal Server Error"}.
    const chapterData = getChapterData(chaptersData, chapterIdOrSlug);
    if (!chapterData) {
      return {
        props: {
          hasError: true,
        },
        revalidate: REVALIDATION_PERIOD_ON_ERROR_SECONDS, // 35 seconds will be enough time before we re-try generating the page again.
      };
    }
    return {
      props: {
        chaptersData,
        chapterResponse: {
          chapter: { ...chapterData, id: chapterIdOrSlug },
        },
        versesResponse: {
          ...versesResponse,
          pagesLookup: pagesLookupResponse,
          metaData,
        },
        isVerse,
      },
      revalidate: ONE_WEEK_REVALIDATION_PERIOD_SECONDS, // verses will be generated at runtime if not found in the cache, then cached for subsequent requests for 7 days.
    };
  } catch (error) {
    return {
      props: {
        hasError: true,
      },
      revalidate: REVALIDATION_PERIOD_ON_ERROR_SECONDS, // 35 seconds will be enough time before we re-try generating the page again.
    };
  }
};

export const getStaticPaths = async () => ({
  paths: [], // no pre-rendered chapters at build time.
  fallback: "blocking", // will server-render pages on-demand if the path doesn't exist.
});

export default VersePage;
