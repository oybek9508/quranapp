import { useEffect, useState } from "react";
import { getJuzVerses } from "src/api/quran-juz-api";
import { getAllChaptersData } from "src/utils/chapters";
import { formatStringNumber } from "src/utils/number";
import { BASE_URL } from "src/api/api";
import {
  ONE_WEEK_REVALIDATION_PERIOD_SECONDS,
  REVALIDATION_PERIOD_ON_ERROR_SECONDS,
} from "src/utils/staticPageGeneration";
import { isValidJuzId } from "src/utils/validator";
import Error from "src/pages/_error";
import DataContext from "src/context/DataContext";

const JuzPage = ({ chaptersData, juzVerses, hasError }) => {
  const [juzMappings, setJuzMappings] = useState([]);

  if (hasError) {
    return <Error statusCode={500} />;
  }
  return (
    <DataContext.Provider value={chaptersData}>JuzView</DataContext.Provider>
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
    const juzData = await getJuzVerses(juzId);
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
        error: JSON.parse(JSON.stringify(error)),
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
