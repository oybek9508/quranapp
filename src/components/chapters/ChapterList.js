import { Box, Input, Menu, MenuList, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import ChapterItem from "./ChapterItem";
import { useQuranChapters } from "/src/api/quran-chapter-api";

const ChapterList = () => {
  const [searchedChapter, setSearchedChapter] = useState("nas");
  const [chapters, setChapters] = useState({});
  const { data, error } = useQuranChapters();
  useEffect(() => {
    if (!chapters) return;
    setChapters(data);
  }, [chapters, data]);

  console.log("data", data);
  console.log("chapters", chapters);
  return (
    <MenuList sx={{ pb: "56px", width: "100%" }}>
      <TextField
        id="filled-search"
        label="Search field"
        type="search"
        variant="filled"
        value=""
      />
      {data?.chapters.map((chapter) => {
        return <ChapterItem key={chapter.id} chapter={chapter} />;
      })}
    </MenuList>
  );
};

export default ChapterList;
