/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BASE_URL } from "/src/api/api";
import Header from "/src/components/Header";
import { Grid } from "@mui/material";
import { useSingleSurah } from "src/api/quran-chapter-api";
import { getChapterVerses } from "src/api/quran-chapter-api";
import Order from "/src/components/ayah/Order";
import ReadingPreferenceTab from "src/components/pages/chapterID/ReadingPreferenceTab";
import { useSelector } from "react-redux";
import { isValidChapterId } from "src/utils/validator";
import {
  ONE_WEEK_REVALIDATION_PERIOD_SECONDS,
  REVALIDATION_PERIOD_ON_ERROR_SECONDS,
} from "src/utils/staticPageGeneration";
import { getAllChaptersData } from "src/utils/chapters";
import Error from "../_error";
import DataContext from "src/context/DataContext";

const SurahDetail = (props) => {
  const state = useSelector((state) => state.theme);
  const { chapterData, chapterId, hasError, chaptersData } = props;
  if (hasError) {
    return <Error statusCode={500} />;
  }

  console.log("chaptersData", chaptersData[chapterId]);

  const { data, error, isLoading } = useSingleSurah(props.chapterId);
  return (
    <DataContext.Provider value={chaptersData}>
      <Header type="back" singleChapter={data} />
      <Grid sx={{ px: 3, mt: 4 }}>
        <ReadingPreferenceTab
          initialData={chapterData}
          chapterId={chapterId}
          singleChapter={{ ...chaptersData[chapterId], id: chapterId }}
        />
      </Grid>
    </DataContext.Provider>
  );
};

export const getStaticProps = async ({ params, locale }) => {
  let chapterId = params.chapterId;
  if (!isValidChapterId(chapterId)) {
    return {
      notFound: true,
    };
  }

  try {
    const chaptersData = await getAllChaptersData();
    const chapterData = await getChapterVerses(Number(chapterId), locale, {
      perPage: "all",
    });

    return {
      props: {
        chapterId,
        chapterData,
        chaptersData,
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

export default SurahDetail;
