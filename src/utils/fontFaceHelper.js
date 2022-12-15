import { QuranFont } from "src/constants/QuranReader";

const QCFFontCodes = [QuranFont.MadaniV1, QuranFont.MadaniV2];
export const isQCFFont = (font) => QCFFontCodes.includes(font);

export const getFontClassName = (
  quranFont,
  fontScale,
  mushafLines,
  isFallbackFont = false
) => {
  if (quranFont === QuranFont.IndoPak) {
    return `${quranFont}_${mushafLines}-font-size-${fontScale}`;
  }
  return isFallbackFont
    ? `fallback_${quranFont}-font-size-${fontScale}`
    : `${quranFont}-font-size-${fontScale}`;
};

export const getLineWidthClassName = (
  quranFont,
  fontScale,
  mushafLines,
  isFallbackFont = false
) => {
  if (quranFont === QuranFont.IndoPak) {
    return `${quranFont}_${mushafLines}-line-width-${fontScale}`;
  }

  return isFallbackFont
    ? `fallback_${quranFont}-line-width-${fontScale}`
    : `${quranFont}-line-width-${fontScale}`;
};
