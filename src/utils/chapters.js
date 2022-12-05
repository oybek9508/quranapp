import { formatStringNumber } from "./number";

const DEFAULT_LANGUAGE = "en";
const SUPPORTED_CHAPTER_LOCALES = [
  "en",
  "ar",
  "bn",
  "fr",
  "id",
  "it",
  "nl",
  "ru",
  "tr",
  "ur",
  "zh",
];

export const getAllChaptersData = (lang = DEFAULT_LANGUAGE) => {
  if (SUPPORTED_CHAPTER_LOCALES.includes(lang)) {
    return new Promise((res) => {
      import(`src/data/chapters/${lang}.json`).then((data) => {
        res(data.default);
      });
    });
  }
  return new Promise((res) => {
    import(`src/data/chapters/en.json`).then((data) => {
      // @ts-ignore
      res(data.default);
    });
  });
};

export const getAllJuzMappings = () => {
  return new Promise((res) => {
    import("/src/data/juz-to-chapter-verse-mappings.json").then((data) => {
      res(data.default);
    });
  });
};

export const getChapterData = (chapters, id) =>
  chapters[formatStringNumber(id)];
