import { Grid } from "@mui/material";
import Image from "next/image";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import Bismillah from "../common/Bismillah";
// import Bismillah from "../common/Bismillah";
import ChapterIconContainer, { ChapterIconsSize } from "./ChapterIconContainer";

const CHAPTERS_WITHOUT_BISMILLAH = ["1", "9"];

const ChapterHeader = ({
  chapterId,
  pageNumber,
  hizbNumber,
  translationName,
  isTranslationSelected,
}) => {
  const dispatch = useDispatch();
  const headerRef = useRef(null);
  return (
    <div>
      <div>
        <div>
          <ChapterIconContainer
            id={chapterId}
            size={ChapterIconsSize.Mega}
            hasSurahPrefix={true}
          />
        </div>
      </div>
      <div>
        {!CHAPTERS_WITHOUT_BISMILLAH.includes(chapterId) && (
          <Grid container justifyContent="center" mt={2} mb={5}>
            <Bismillah />
          </Grid>
        )}
      </div>
    </div>
  );
};

export default ChapterHeader;
