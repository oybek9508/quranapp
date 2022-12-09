import useSWRImmutable from "swr/immutable";
import { getMushafId } from "src/utils/api";
import { getPagesLookupParams } from "src/utils/page";
import { makePagesLookupUrl } from "src/api/apiPaths";
import { fetcher } from "src/api/api";

/**
 * This hooks fetches the total number of pages of a specific Mushaf of
 * a resource e.g. a page/juz/verse/range/hiz etc.
 */

const useFetchPagesLookup = (
  resourceId,
  quranReaderDataType,
  initialData,
  quranReaderStyles,
  isUsingDefaultFont
) => {
  const { data, error, isValidating } = useSWRImmutable(
    makePagesLookupUrl(
      getPagesLookupParams(
        resourceId,
        quranReaderDataType,
        getMushafId(quranReaderStyles.quranFont, quranReaderStyles.mushafLines)
          .mushaf,
        initialData
      )
    ),
    fetcher,
    {
      fallbackData: initialData.pagesLookup,
      revalidateOnMount: !isUsingDefaultFont,
    }
  );

  return {
    pagesCount: data.totalPage,
    pagesVersesRange: data.pages,
    lookupRange: data.lookupRange,
    hasError: !!error,
    isLoading: isValidating,
  };
};

export default useFetchPagesLookup;
