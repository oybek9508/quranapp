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

export const getVerseNumberFromKey = (verseKey) =>
  Number(verseKey.split(COLON_SPLITTER)[1]);
