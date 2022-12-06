import {
  Box,
  CircularProgress,
  Grid,
  MenuList,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useState, useEffect, useContext, useMemo } from "react";
import { useJuzList } from "src/api/quran-juz-api";
import DataContext from "src/context/DataContext";
import { getAllJuzMappings, getChapterData } from "src/utils/chapters";
import ChapterItem from "../chapters/ChapterItem";

const JuzList = ({ isDescending }) => {
  const [juzMappings, setJuzMappings] = useState([]);
  const chaptersData = useContext(DataContext);

  useEffect(() => {
    getAllJuzMappings()
      .then((data) => Object.entries(data))
      .then(setJuzMappings);
  }, [isDescending]);

  const sortedJuzIds = useMemo(
    () =>
      isDescending
        ? juzMappings.slice().sort(([a], [b]) => Number(b) - Number(a))
        : juzMappings,
    [isDescending, juzMappings]
  );

  if (juzMappings.length === 0) {
    return <CircularProgress />;
  }

  return (
    <MenuList sx={{ pb: "56px", width: "100%" }}>
      <Grid sx={{ columnCount: { xs: 1, sm: 2, lg: 3 } }}>
        {sortedJuzIds.map((juzEntry) => {
          const [juzId, chapterAndVerseMappings] = juzEntry;
          const chapterIds = Object.keys(chapterAndVerseMappings);
          return (
            <Grid
              key={juzId}
              sx={{
                m: 1,
                border: "1px solid gray",
                borderRadius: "5px",
                p: 1,
                display: "inline-block",
                width: "100%",
                height: "object-fit",
              }}
            >
              <Link href={`/juz/${juzId}`} shouldPrefetch={false}>
                Juz {juzId}
              </Link>
              {chapterIds.map((chapterId) => {
                const chapter = getChapterData(chaptersData, chapterId);
                return (
                  <Grid
                    key={chapterId}
                    sx={{
                      cursor: "pointer",
                      borderRadius: 2,
                      border: "1px solid rgba(187, 196, 206, 0.35)",
                      m: 1,
                      height: "75px",
                    }}
                  >
                    <Link
                      href={`/${chapterId}/${chapterAndVerseMappings[chapterId]}`}
                      shouldPrefetch={false}
                    >
                      <ChapterItem chapter={{ ...chapter, id: chapterId }} />
                    </Link>
                  </Grid>
                );
              })}
            </Grid>
          );
        })}
      </Grid>
    </MenuList>
  );
};

export default JuzList;
