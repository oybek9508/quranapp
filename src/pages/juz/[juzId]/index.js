import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getJuzVerses } from "src/api/quran-juz-api";
import { getAllChaptersData } from "src/utils/chapters";
import { formatStringNumber } from "src/utils/number";
import { BASE_URL, getDefaultWordFields } from "src/api/api";
import {
  ONE_WEEK_REVALIDATION_PERIOD_SECONDS,
  REVALIDATION_PERIOD_ON_ERROR_SECONDS,
} from "src/utils/staticPageGeneration";
import { isValidJuzId } from "src/utils/validator";
import Error from "src/pages/_error";
import DataContext from "src/context/DataContext";
import ReadingPreferenceTab from "src/components/QuranReader/ReadingPreferenceTab";
import { getPagesLookup } from "src/api/quran-page-api";
import { generateVerseKeysBetweenTwoVerseKeys } from "src/utils/verseKeys";
import { QuranFont } from "src/constants/QuranReader";

const JuzPage = ({ chaptersData, juzVerses, hasError }) => {
  const router = useRouter();
  const {
    query: { juzId },
  } = router;
  const [juzMappings, setJuzMappings] = useState([]);

  console.log("juzVerses", juzVerses);
  console.log("chaptersData", chaptersData);

  if (hasError) {
    return <Error statusCode={500} />;
  }
  return (
    <DataContext.Provider value={chaptersData}>
      <ReadingPreferenceTab initialData={juzVerses} id={String(juzId)} />
    </DataContext.Provider>
  );
};

export const getStaticProps = async ({ params, locale }) => {
  let juzId = String(params.juzId);
  if (!isValidJuzId(juzId)) {
    return {
      notFound: true,
    };
  }
  const chaptersData = await getAllChaptersData(locale);
  juzId = formatStringNumber(juzId);

  try {
    // const pagesLookupResponse = await getPagesLookup({
    //   juzNumber: Number(juzId),
    //   // mushaf: 2,
    // });
    // const firstPageOfJuz = Object.keys(pagesLookupResponse.pages)[0];
    // const firstPageOfJuzLookup = pagesLookupResponse.pages[firstPageOfJuz];
    // const numberOfVerses = generateVerseKeysBetweenTwoVerseKeys(
    //   chaptersData,
    //   pagesLookupResponse.lookupRange.from,
    //   pagesLookupResponse.lookupRange.to
    // ).length;
    const juzData = await getJuzVerses(juzId, locale, {});
    // juzData.pagesLookup = pagesLookupResponse;
    return {
      props: {
        chaptersData,
        juzVerses: juzData,
      },
      revalidate: ONE_WEEK_REVALIDATION_PERIOD_SECONDS,
    };
  } catch (error) {
    return {
      props: {
        hasError: true,
      },
      revalidate: REVALIDATION_PERIOD_ON_ERROR_SECONDS,
    };
  }
};

export const getStaticPaths = async () => ({
  paths: [], // no pre-rendered chapters at build time.
  fallback: "blocking", // will server-render pages on-demand if the path doesn't exist.
});

export default JuzPage;
