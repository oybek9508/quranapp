import { fetcher, getDefaultWordFields } from "src/api/api";
import { makeVersesByPageUrl } from "src/api/apiPaths";
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

export const verseFetcher = async (input, init) => {
  const res = await fetcher(input, init);
  // @ts-ignore ignore this typing for now, we'll get back into this when we fix the "initial data not being used" issue
  return res.verses;
};
