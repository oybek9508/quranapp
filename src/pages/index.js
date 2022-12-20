import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import {
  Box,
  Button,
  CardMedia,
  Grid,
  Paper,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "/src/components/layout/Layout";
import MainBanner from "/src/components/banners/MainBanner";
import ChapterJuzPage from "src/components/home/ChapterJuzPage";
import { getAllChaptersData } from "src/utils/chapters";
import DataContext from "src/context/DataContext";
import Header from "src/components/home/Header";
import { useSelector } from "react-redux";

const Home = ({ chaptersData, chaptersResponse: { chapters } }) => {
  const state = useSelector((state) => state);
  console.log("state", state);
  return (
    <ThemeProvider>
      <Head>
        <title>main quran page</title>
      </Head>
      <DataContext.Provider value={chaptersData}>
        <Box sx={{ px: "20px", pt: "20px" }}>
          <Typography sx={{ fontSize: "18px" }}>Assalomu Alaykum</Typography>
          <Typography
            sx={{
              fontSize: "18px",
            }}
          >
            Oybek Toshmatov
          </Typography>
          <Header />
          {/* <MainBanner /> */}
          <ChapterJuzPage chapters={chapters} />
        </Box>
      </DataContext.Provider>
    </ThemeProvider>
  );
};

export const getStaticProps = async ({ params, locale }) => {
  const chaptersData = await getAllChaptersData(locale);

  return {
    props: {
      chaptersData,
      chaptersResponse: {
        chapters: Object.keys(chaptersData).map((chapterId) => {
          const chapterData = chaptersData[chapterId];
          return {
            ...chapterData,
            id: Number(chapterId),
          };
        }),
      },
    },
  };
};

export default Home;
