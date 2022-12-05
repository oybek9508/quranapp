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
