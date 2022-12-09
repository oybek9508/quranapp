import {
  Mushaf,
  QuranFont,
  QuranFontMushaf,
  QuranReaderDataType,
} from "src/constants/QuranReader";
import { toLocalizedNumber } from "./locale";

const DEFAULT_NUMBER_OF_PAGES = 604;

// a map between the mushafId and the number of pages it has
const PAGES_MUSHAF_MAP = {
  [Mushaf.Indopak]: 604,
  [Mushaf.KFGQPCHAFS]: 604,
  [Mushaf.QCFV1]: 604,
  [Mushaf.QCFV2]: 604,
  [Mushaf.UthmaniHafs]: 604,
  [Mushaf.Indopak16Lines]: 548,
  [Mushaf.Indopak15Lines]: 610,
};

const getMushafTotalPageNumber = (quranFont, mushafLines) => {
  let mushafTotalPages = 0;
  // this is when we are SSR the page because those 2 values won't be there since they come from Redux
  if (!quranFont || !mushafLines) {
    mushafTotalPages = DEFAULT_NUMBER_OF_PAGES;
  } else if (quranFont === QuranFont.IndoPak) {
    mushafTotalPages =
      mushafLines === MushafLines.SixteenLines
        ? PAGES_MUSHAF_MAP[Mushaf.Indopak16Lines]
        : PAGES_MUSHAF_MAP[Mushaf.Indopak15Lines];
  } else {
    mushafTotalPages = PAGES_MUSHAF_MAP[QuranFontMushaf[quranFont]];
  }
  return mushafTotalPages;
};

export const getPageIdsByMushaf = (lang, quranFont, mushafLines) =>
  [...Array(getMushafTotalPageNumber(quranFont, mushafLines))].map(
    (n, index) => {
      const page = index + 1;
      return { value: page, label: page };
    }
  );

export const getMushafLinesNumber = (quranFont, mushafLines) => {
  if (
    quranFont !== QuranFont.IndoPak ||
    (quranFont === QuranFont.IndoPak &&
      mushafLines === MushafLines.FifteenLines)
  ) {
    return 15;
  }
  return 16;
};

export const getPagesLookupParams = (
  resourceId,
  quranReaderDataType,
  mushafId,
  initialData
) => {
  const params = { mushaf: mushafId };
  const resourceIdNumber = Number(resourceId);
  switch (quranReaderDataType) {
    case QuranReaderDataType.Chapter:
      params.chapterNumber = resourceIdNumber;
      break;
    case QuranReaderDataType.Hizb:
      params.hizbNumber = resourceIdNumber;
      break;
    case QuranReaderDataType.Juz:
      params.juzNumber = resourceIdNumber;
      break;
    case QuranReaderDataType.Page:
      params.pageNumber = resourceIdNumber;
      break;
    case QuranReaderDataType.Rub:
      params.rubElHizbNumber = resourceIdNumber;
      break;
    case QuranReaderDataType.Verse:
      params.chapterNumber = resourceIdNumber;
      params.from = initialData.verses[0].verseKey;
      params.to = initialData.verses[0].verseKey;
      break;
    case QuranReaderDataType.VerseRange:
      params.chapterNumber = resourceIdNumber;
      params.from = initialData.metaData.from;
      params.to = initialData.metaData.to;
      break;
    default:
      break;
  }
  return params;
};

export const getPageNumberByPageIndex = (pageIndex, pagesVersesRange) =>
  Number(Object.keys(pagesVersesRange)[0]) + pageIndex;
