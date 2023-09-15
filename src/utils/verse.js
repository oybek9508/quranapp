import { range } from "lodash";
import { formatStringNumber } from "./number";

const COLON_SPLITTER = ":";
export const getVerseWords = (verse, isReadingView = false) => {
  const words = [];
  verse.words.forEach((word) => {
    const wordVerse = { ...verse };
    words.push({
      ...word,
      hizbNumber: verse.hizbNumber,
      ...(isReadingView && { verse: wordVerse }),
    });
  });
  return words;
};

export const getWordDataByLocation = (wordLocation) => {
  const locationSplits = wordLocation.split(COLON_SPLITTER);
  return [locationSplits[0], locationSplits[1], locationSplits[2]];
};

export const getFirstWordOfSurah = (wordLocation) => {
  const locationSplits = getWordDataByLocation(wordLocation);
  return {
    chapterId: locationSplits[0],
    isFirstWordOfSurah: locationSplits[1] === "1" && locationSplits[2] === "1",
  };
};

export const makeWordLocation = (verseKey, wordPosition) =>
  `${verseKey}:${wordPosition}`;

export const getChapterNumberFromKey = (verseKey) =>
  Number(verseKey.split(COLON_SPLITTER)[0]);

export const getVerseNumberFromKey = (verseKey) =>
  Number(verseKey.split(COLON_SPLITTER)[1]);

export const makeVerseKey = (chapterNumber, from, to) => {
  if (to && from !== to) return `${chapterNumber}:${from}-${to}`;
  return `${chapterNumber}:${from}`;
};

export const getDistanceBetweenVerses = (
  chaptersData,
  firstVerseKey,
  secondVerseKey
) => {
  // eslint-disable-next-line prefer-const
  let [firstChapterString, firstVerseNumberString] =
    getVerseAndChapterNumbersFromKey(firstVerseKey);
  const [secondChapterString, secondVerseNumberString] =
    getVerseAndChapterNumbersFromKey(secondVerseKey);
  let firstChapterNumber = Number(firstChapterString);
  let secondChapterNumber = Number(secondChapterString);
  let firstVerseNumber = Number(firstVerseNumberString);
  let secondVerseNumber = Number(secondVerseNumberString);
  // if they are within the same chapter
  if (firstChapterNumber === secondChapterNumber) {
    if (firstVerseNumber > secondVerseNumber) {
      return firstVerseNumber - secondVerseNumber;
    }
    return secondVerseNumber - firstVerseNumber;
  }
  // if the first verse chapter is after the second, we swap them to match the same order in the Mushaf
  if (firstChapterNumber > secondChapterNumber) {
    [
      firstVerseNumber,
      secondVerseNumber,
      firstChapterNumber,
      secondChapterNumber,
      firstChapterString,
    ] = [
      secondVerseNumber,
      firstVerseNumber,
      secondChapterNumber,
      firstChapterNumber,
      secondChapterString,
    ];
  }
  let distance = 0;
  // if there is more than 1 full chapter in between the verses' chapters being checked, we sum the number of verses in each chapter.
  if (secondChapterNumber - firstChapterNumber > 1) {
    distance += getNumberOfVersesInRangeOfChapters(
      chaptersData,
      firstChapterNumber + 1,
      secondChapterNumber
    );
  }
  /*
    1. we add the number of verses from beginning of the second verse's chapter -> the verse itself.
    2. we add the difference between the last verse of the first verse's chapter and the first verse itself.
  */
  return (
    distance +
    secondVerseNumber +
    getChapterData(chaptersData, firstChapterString).versesCount -
    firstVerseNumber
  );
};

export const generateChapterVersesKeys = (data, chapterId) => {
  const chapterNumberString = formatStringNumber(chapterId);

  return range(data[chapterNumberString].versesCount).map(
    (verseId) => `${chapterNumberString}:${verseId + 1}`
  );
};

export const getVerseAndChapterNumbersFromKey = (verseKey) => {
  const splits = verseKey?.split(COLON_SPLITTER);
  return [splits[0], splits[1]];
};
