import { Grid } from "@mui/material";
import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import BasicTabs from "src/components/common/Tabs";
import { QuranFont } from "src/constants/QuranReader";
import {
  selectQuranReaderStyles,
  setQuranFont,
} from "src/redux/slices/QuranReader/styles";
import FontPreview from "./FontPreview";
import Section from "./Section";

const QuranFontSection = () => {
  const dispatch = useDispatch();
  const quranReaderStyles = useSelector(selectQuranReaderStyles, shallowEqual);

  const { quranFont, quranTextFontScale, mushafLines } = quranReaderStyles;

  const types = [
    { value: QuranFont.QPCHafs, label: "Uthmani" },
    { value: QuranFont.IndoPak, label: "Indopak" },
    { value: QuranFont.Tajweed, label: "Tajweed" },
  ].map((font) => ({
    label: font.label,
    value: font.value,
  }));

  const handleChange = (event, newValue) => {
    dispatch(setQuranFont(newValue));
  };

  return (
    <Section>
      <Section.Title>Quran Font</Section.Title>
      <BasicTabs value={quranFont} lists={types} handleChange={handleChange} />
      <Section.Raw>
        <Grid>
          <FontPreview />
        </Grid>
      </Section.Raw>
    </Section>
  );
};

export default QuranFontSection;
