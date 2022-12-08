import { Box, Grid, Input, Menu, MenuList, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import ChapterItem from "./ChapterItem";
import { useQuranChapters } from "/src/api/quran-chapter-api";

const ChapterList = ({ chapters }) => {
  const [searchedChapter, setSearchedChapter] = useState("nas");
  return (
    <MenuList sx={{ pb: "56px" }}>
      <Grid container justifyContent="space-between">
        {chapters?.map((chapter) => {
          return (
            <Grid
              item
              // container
              xs={12}
              sm={4}
              md={4}
              lg={3}
              key={chapter.id}
              sx={{
                cursor: "pointer",
                borderRadius: 2,
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
