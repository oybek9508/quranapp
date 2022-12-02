import { MenuList } from "@mui/material";
import React from "react";
import { useJuzList } from "src/api/quran-juz-api";
import JuzItem from "./JuzItem";

const JuzList = () => {
  const { data, error, isLoading } = useJuzList();
  console.log("data", data);
  return (
    <MenuList sx={{ pb: "56px", width: "100%" }}>
      {data?.juzs?.map((juz) => (
        <JuzItem key={juz.id} juz={juz} />
      ))}
    </MenuList>
  );
};

export default JuzList;
