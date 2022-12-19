import { Grid, useTheme } from "@mui/material";
import Image from "next/image";
import React, { useRef } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { QuranFont } from "src/constants/QuranReader";
import { selectQuranReaderStyles } from "src/redux/slices/QuranReader/styles";
import { selectTheme } from "src/redux/slices/theme";
import { ThemeTypes } from "src/styles/theme/modes";
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
  const theme = useTheme();
  const { type } = useSelector(selectTheme, shallowEqual);
  const { quranFont } = useSelector(selectQuranReaderStyles, shallowEqual);
  return (
    <div>
      <div>
        <Grid
          sx={{
            color:
              type === ThemeTypes.Dark &&
              quranFont === QuranFont.Tajweed &&
              theme.palette.text.secondary,
          }}
        >
          <ChapterIconContainer
            id={chapterId}
            size={ChapterIconsSize.Mega}
            hasSurahPrefix={true}
          />
        </Grid>
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
