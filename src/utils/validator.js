import { getChapterData } from "./chapters";

export const isValidChapterId = (chapterId) => {
  const chapterIdNumber = Number(chapterId);
  // if it's not a numeric string or it's numeric but out of the range of chapter 1->114
  if (
    Number.isNaN(chapterIdNumber) ||
    chapterIdNumber > 114 ||
    chapterIdNumber < 1
  ) {
    return false;
  }
  return true;
};

export const isValidVerseNumber = (verseId) => {
  const verseIdNumber = Number(verseId);
  return !Number.isNaN(verseIdNumber);
};

export const isValidVerseId = (chaptersData, chapterId, verseId) => {
  const verseIdNumber = Number(verseId);
  // is not a valid number, below 1 or above the maximum number of verses for the chapter.
  if (Number.isNaN(verseIdNumber) || verseIdNumber < 1) {
    return false;
  }
  if (
    !getChapterData(chaptersData, chapterId) ||
    verseIdNumber > getChapterData(chaptersData, chapterId).versesCount
  ) {
    return false;
  }
  return true;
};

export const isValidJuzId = (juzId) => {
  const juzIdNumber = Number(juzId);
  // if it's not a numeric string or it's numeric but out of the range of chapter 1->30
  if (Number.isNaN(juzIdNumber) || juzIdNumber > 30 || juzIdNumber < 1) {
    return false;
  }
  return true;
};

export const isValidPageId = (juzId) => {
  const pageIdNumber = Number(juzId);
  // if it's not a numeric string or it's numeric but out of the range of chapter 1->604
  if (Number.isNaN(pageIdNumber) || pageIdNumber > 604 || pageIdNumber < 1) {
    return false;
  }
  return true;
};
export const getToAndFromFromRange = (range) => range.split("-");

export const isValidVerseRange = (chaptersData, chapterId, range) => {
  const rangeSplits = getToAndFromFromRange(range);
  // if the splits are not 2, it means it's not in the right format.
  if (rangeSplits.length !== 2) {
    return false;
  }
  const [from, to] = rangeSplits;
  const fromNumber = Number(from);
  const toNumber = Number(to);
  // if the range is in the right format but either value is not a number e.g. 'one-two'
  if (Number.isNaN(fromNumber) || Number.isNaN(toNumber)) {
    return false;
  }
  // if the from verse number is bigger than the to verse number
  if (fromNumber > toNumber) {
    return false;
  }
  // if the chapterId is not a valid chapterId e.g. "word"
  if (!getChapterData(chaptersData, chapterId)) {
    return false;
  }
  const chapterVersesCount = getChapterData(
    chaptersData,
    chapterId
  ).versesCount;
  // if either the from verse number of to verse number exceeds the chapter's total number.
  if (fromNumber > chapterVersesCount || toNumber > chapterVersesCount) {
    return false;
  }

  return true;
};
