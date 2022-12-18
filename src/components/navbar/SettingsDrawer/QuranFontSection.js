import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import BasicTabs from "src/components/common/Tabs";
import { QuranFont } from "src/constants/QuranReader";
import { selectQuranReaderStyles } from "src/redux/slices/QuranReader/styles";
import Section from "./Section";

const QuranFontSection = () => {
  const dispatch = useDispatch();
  const quranReaderStyles = useSelector(selectQuranReaderStyles, shallowEqual);
  console.log("quranReaderStyles", quranReaderStyles);

  const { quranFont, quranTextFontScale, mushafLines } = quranReaderStyles;

  const fonts = {
    [QuranFont.IndoPak]: [
      {
        id: QuranFont.IndoPak,
        label: QuranFont.IndoPak,
        value: QuranFont.IndoPak,
      },
    ],
    [QuranFont.Tajweed]: [
      {
        id: QuranFont.Tajweed,
        label: QuranFont.Tajweed,
        value: QuranFont.Tajweed,
      },
    ],
    [QuranFont.Uthmani]: [
      {
        id: QuranFont.MadaniV1,
        label: QuranFont.MadaniV1,
        value: QuranFont.MadaniV1,
        name: QuranFont.MadaniV1,
      },
      {
        id: QuranFont.MadaniV2,
        label: QuranFont.MadaniV2,
        value: QuranFont.MadaniV2,
        name: QuranFont.MadaniV2,
      },
      {
        id: QuranFont.QPCHafs,
        label: QuranFont.QPCHafs,
        value: QuranFont.QPCHafs,
        name: QuranFont.QPCHafs,
      },
    ],
  };
  return (
    <Section>
      <Section.Title>Quran Font</Section.Title>
      <BasicTabs value={quranFont} />
    </Section>
  );
};

export default QuranFontSection;
