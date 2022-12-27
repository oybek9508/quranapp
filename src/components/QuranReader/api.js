import { fetcher, getDefaultWordFields } from "src/api/api";
import { makeVersesByPageUrl, makeVersesUrl } from "src/api/apiPaths";
import { QuranReaderDataType } from "src/constants/QuranReader";
import { getMushafId } from "src/utils/api";

export const getReaderViewRequestKey = ({
  pageNumber,
  locale,
  quranReaderStyles,
  //   reciter,
  wordByWordLocale,
  pageVersesRange,
}) => {
  return makeVersesByPageUrl(
    pageNumber,
    locale,
    {
      ...getDefaultWordFields(quranReaderStyles.quranFont),
      ...getMushafId(
        quranReaderStyles.quranFont,
        quranReaderStyles.mushafLines
      ),
      //   reciter,
      perPage: "all",
      //   wordTranslationLanguage: wordByWordLocale,
      filterPageWords: true,
      ...(pageVersesRange && { ...pageVersesRange }), // add the from and to verse range of the current page
    },
    false
  );
};

export const getTranslationViewRequestKey = ({
  id,
  isVerseData,
  initialData,
  pageNumber,
  quranReaderStyles,
  quranReaderType,
  selectedTranslations,
  reciter,
  locale = "",
  wordByWordLocale,
}) => {
  // if the response has only 1 verse it means we should set the page to that verse this will be combined with perPage which will be set to only 1.
  const page = isVerseData ? initialData.verses[0].verseNumber : pageNumber;
  if (quranReaderType === QuranReaderDataType.Juz) {
    return makeJuzVersesUrl(id, locale, {
      wordTranslationLanguage: wordByWordLocale,
      page,
      reciter,
      translations: selectedTranslations.join(","),
      ...getDefaultWordFields(quranReaderStyles.quranFont),
      ...getMushafId(
        quranReaderStyles.quranFont,
        quranReaderStyles.mushafLines
      ),
      perPage: initialData.pagination.perPage,
    });
  }
  if (quranReaderType === QuranReaderDataType.Hizb) {
    return makeHizbVersesUrl(id, locale, {
      wordTranslationLanguage: wordByWordLocale,
      page,
      reciter,
      translations: selectedTranslations.join(","),
      ...getDefaultWordFields(quranReaderStyles.quranFont),
      ...getMushafId(
        quranReaderStyles.quranFont,
        quranReaderStyles.mushafLines
      ),
      perPage: initialData.pagination.perPage,
    });
  }
  if (quranReaderType === QuranReaderDataType.Page) {
    return makePageVersesUrl(id, locale, {
      wordTranslationLanguage: wordByWordLocale,
      page,
      reciter,
      perPage: "all",
      translations: selectedTranslations.join(","),
      ...getDefaultWordFields(quranReaderStyles.quranFont),
      ...getMushafId(
        quranReaderStyles.quranFont,
        quranReaderStyles.mushafLines
      ),
    });
  }
  if (quranReaderType === QuranReaderDataType.Rub) {
    return makeRubVersesUrl(id, locale, {
      wordTranslationLanguage: wordByWordLocale,
      reciter,
      page,
      from: initialData.metaData.from,
      perPage: initialData.pagination.perPage,
      to: initialData.metaData.to,
      translations: selectedTranslations.join(","),
      ...getDefaultWordFields(quranReaderStyles.quranFont),
      ...getMushafId(
        quranReaderStyles.quranFont,
        quranReaderStyles.mushafLines
      ),
    });
  }
  if (quranReaderType === QuranReaderDataType.VerseRange) {
    return makeVersesUrl(id, locale, {
      wordTranslationLanguage: wordByWordLocale,
      reciter,
      page,
      from: initialData.metaData.from,
      perPage: initialData.pagination.perPage,
      to: initialData.metaData.to,
      translations: selectedTranslations.join(","),
      ...getDefaultWordFields(quranReaderStyles.quranFont),
      ...getMushafId(
        quranReaderStyles.quranFont,
        quranReaderStyles.mushafLines
      ),
    });
  }

  return makeVersesUrl(id, locale, {
    // wordTranslationLanguage: wordByWordLocale,
    reciter,
    page,
    perPage: isVerseData ? 1 : initialData.pagination.perPage, // the idea is that when it's a verse view, we want to fetch only 1 verse starting from the verse's number and we can do that by passing per_page option to the API.
    // translations: selectedTranslations.join(","),
    ...getDefaultWordFields(quranReaderStyles.quranFont),
    ...getMushafId(quranReaderStyles.quranFont, quranReaderStyles.mushafLines),
  });
};

export const verseFetcher = async (input, init) => {
  const res = await fetcher(input, init);
  // @ts-ignore ignore this typing for now, we'll get back into this when we fix the "initial data not being used" issue
  return res.verses;
};
