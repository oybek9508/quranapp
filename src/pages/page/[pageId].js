import React, { useEffect, useState } from "react";
import { getVersesByPage } from "src/api/quran-page-api";
import { BASE_URL } from "/src/api/api";
import { useRouter } from "next/router";
import axios from "axios";

const Index = ({ props }) => {
  const [pageData, setPageData] = useState(null);
  const router = useRouter();
  const {
    query: { pageId },
  } = router;
  useEffect(() => {
    const fetchPageData = async () => {
      // const res = await fetch(
      //   `https://api.quran.com/api/v4/verses/by_page/600`
      // );
      // const data = await res.json();
      const data = await getVersesByPage(pageId);
      setPageData(data);
    };
    fetchPageData();
  }, []);
  console.log("pageData", pageData);

  console.log("page props", props);
  return <div>{pageId}</div>;
};

export const getStaticProps = async ({ params, locale }) => {
  let pageId = String(params.pageId);
  // const pageData = await getVersesByPage(pageId, locale, {
  //   perPage: "all",
  //   filterPageWords: true,
  // });

  const res = await fetch(`https://api.quran.com/api/v4/verses/by_page/600`);
  const data = await res.json();

  return {
    props: {
      // pageId,
      data,
    },
  };
};

export const getStaticPaths = async () => ({
  paths: [], // no pre-rendered chapters at build time.
  fallback: "blocking", // will server-render pages on-demand if the path doesn't exist.
});

export default Index;
