import { toLocalizedNumber } from "./locale";

const TOTAL_QURAN_JUZ = 30;
export const getJuzIds = () => {
  return [...Array(TOTAL_QURAN_JUZ)].map((n, index) => {
    const juz = index + 1;
    return {
      value: juz,
      label: juz,
    };
  });
};

export const getJuzNumberByHizb = (hizb) => Math.ceil(hizb / 2);

export const getJuzNavigationUrl = (juzNumber) => `/juz/${juzNumber}`;
