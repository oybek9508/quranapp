import React, { useEffect, useState } from "react";
import { getVersesByPage } from "src/api/quran-page-api";
import Pages from "src/components/page";
import { BASE_URL } from "/src/api/api";
import { useRouter } from "next/router";

const Index = ({ props }) => {
  const router = useRouter();
  const {
    query: { pageId },
  } = router;
  console.log("page props", props);
  return <div>{pageId}</div>;
};

export const getStaticProps = async ({ params, locale }) => {
  let pageId = params.pageId;
  const pageData = await getVersesByPage(Number(pageId), locale, {
    perPage: "all",
    mushaf: 1,
    filterPageWords: true,
  });

  return {
    props: {
      pageId,
      pageData,
    },
  };
};

export const getStaticPaths = async () => ({
  paths: [], // no pre-rendered chapters at build time.
  fallback: "blocking", // will server-render pages on-demand if the path doesn't exist.
});

export default Index;
