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

const SurahDetail = (props) => {
  const state = useSelector((state) => state.theme);
  console.log("props", props);
  const { chapterData, chapterId } = props;
  const { data, error, isLoading } = useSingleSurah(props.chapterId);
  return (
    <Grid>
      <Header type="back" singleChapter={data} />
      <Grid sx={{ px: 3, mt: 4 }}>
        <ReadingPreferenceTab
          initialData={chapterData}
          chapterId={chapterId}
          singleChapter={data}
        />
      </Grid>
    </Grid>
  );
};

export const getStaticProps = async ({ params, locale }) => {
  let chapterId = params.chapterId;
  const chapterData = await getChapterVerses(Number(chapterId), locale, {
    perPage: "all",
  });

  // verse audio, arabic, translation and other stuff should be in verses array
  // check the quran.com [chapterId] page

  return {
    props: {
      chapterId,
      chapterData,
    },
  };
};

export const getStaticPaths = async () => ({
  paths: [], // no pre-rendered chapters at build time.
  fallback: "blocking", // will server-render pages on-demand if the path doesn't exist.
});

export default SurahDetail;
