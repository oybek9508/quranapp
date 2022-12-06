import { range } from "lodash";
import { getChapterData } from "./chapters";

export const generateVerseKeysBetweenTwoVerseKeys = (
  chaptersData,
  fromVerseKey,
  toVerseKey
) => {
  const verseKeys = [];
  const [startChapter, startVerse] = fromVerseKey.split(":");
  const [endChapter, endVerse] = toVerseKey.split(":");
  if (startChapter === endChapter) {
    range(Number(startVerse), Number(endVerse) + 1).forEach((verseNumber) => {
      verseKeys.push(`${startChapter}:${verseNumber}`);
    });
  } else {
    range(Number(startChapter), Number(endChapter) + 1).forEach(
      (chapterNumber) => {
        if (chapterNumber === Number(startChapter)) {
          const chapterData = getChapterData(chaptersData, startChapter);
          range(Number(startVerse), chapterData.versesCount + 1).forEach(
            (verseNumber) => {
              verseKeys.push(`${startChapter}:${verseNumber}`);
            }
          );
        } else if (chapterNumber === Number(endChapter)) {
          range(1, Number(endVerse) + 1).forEach((verseNumber) => {
            verseKeys.push(`${endChapter}:${verseNumber}`);
          });
        } else {
          const chapterData = getChapterData(
            chaptersData,
            String(chapterNumber)
          );
          range(1, chapterData.versesCount + 1).forEach((verseNumber) => {
            verseKeys.push(`${chapterNumber}:${verseNumber}`);
          });
        }
      }
    );
  }

  return verseKeys;
};
