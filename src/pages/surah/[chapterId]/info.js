import React from "react";
import { getChapterIdBySlug, getChapterInfo } from "src/api/quran-chapter-api";
import InfoPage from "src/components/chapters/Info/InfoPage";
import { getAllChaptersData, getChapterData } from "src/utils/chapters";
import {
  ONE_MONTH_REVALIDATION_PERIOD_SECONDS,
  REVALIDATION_PERIOD_ON_ERROR_SECONDS,
} from "src/utils/staticPageGeneration";
import { isValidChapterId } from "src/utils/validator";

const Info = (props) => {
  console.log("props", props);
  return (
    <div>
      <InfoPage {...props} />
    </div>
  );
};

export const getStaticProps = async ({ params, locale }) => {
  let chapterIdOrSlug = String(params.chapterId);

  if (!isValidChapterId(chapterIdOrSlug)) {
    const sluggedChapterId = await getChapterIdBySlug(chapterIdOrSlug, locale);
    if (!sluggedChapterId) {
      return { notFound: true };
    }

    chapterIdOrSlug = sluggedChapterId;
  }

  const chaptersData = await getAllChaptersData();
  try {
    const chapterInfoResponse = await getChapterInfo(chapterIdOrSlug);
    return {
      props: {
        chaptersData,
        chapterInfoResponse,
        chapterResponse: {
          chapter: getChapterData(chaptersData, chapterIdOrSlug),
        },
      },
      revalidate: ONE_MONTH_REVALIDATION_PERIOD_SECONDS,
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

export default Info;
