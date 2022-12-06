import { Box, Grid, Input, Menu, MenuList, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import ChapterItem from "./ChapterItem";
import { useQuranChapters } from "/src/api/quran-chapter-api";

const ChapterList = ({ chapters }) => {
  const [searchedChapter, setSearchedChapter] = useState("nas");
  return (
    <MenuList sx={{ pb: "56px", width: "100%" }}>
      <Grid sx={{ columnCount: { xs: 1, sm: 2, lg: 3 } }}>
        {chapters?.map((chapter) => {
          return (
            <Grid
              // item
              // container
              // xs={6}
              // sm={4}
              // md={4}
              // lg={3}
              key={chapter.id}
              sx={{
                cursor: "pointer",
                borderRadius: 2,
                width: "100%",
                display: "inline-block",
                border: "1px solid rgba(187, 196, 206, 0.35)",
                m: 1,
              }}
            >
              <ChapterItem chapter={chapter} />
            </Grid>
          );
        })}
      </Grid>
    </MenuList>
  );
};

export default ChapterList;
