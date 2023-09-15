import { getVerseAndChapterNumbersFromKey } from "./verse";

export const getPageNavigationUrl = (pageNumber) => `/page/${pageNumber}`;
export const getChapterWithStartingVerseUrl = (verseKey) => {
  const [chapterId, verseNumber] = getVerseAndChapterNumbersFromKey(verseKey);
  return `/${chapterId}?startingVerse=${verseNumber}`;
};
