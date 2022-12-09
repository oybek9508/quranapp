import {
  Mushaf,
  MushafLines,
  QuranFont,
  QuranFontMushaf,
} from "src/constants/QuranReader";

export const getDefaultWordFields = (quranFont) => ({
  wordFields: `verse_key,verse_id,page_number,location,text_uthmani,${quranFont}${
    quranFont === QuranFont.QPCHafs ? "" : `,${QuranFont.QPCHafs}`
  }`,
});

export const getMushafId = (
  // eslint-disable-next-line default-param-last
  quranFont = QuranFont.QPCHafs,
  mushafLines
) => {
  let mushaf = QuranFontMushaf[quranFont];
  // convert the Indopak mushaf to either 15 or 16 lines Mushaf
  if (quranFont === QuranFont.IndoPak && mushafLines) {
    mushaf =
      mushafLines === MushafLines.FifteenLines
        ? Mushaf.Indopak15Lines
        : Mushaf.Indopak16Lines;
  }
  return { mushaf };
};
