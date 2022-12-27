export const verseTranslationChanged = (prevVerse, nextVerse) =>
  prevVerse?.translations?.length !== nextVerse?.translations?.length;

/**
 * Checks whether the translation font styles has changed between the re-renders
 */
export const verseTranslationFontChanged = (prevQuranStyles, nextQuranStyles) =>
  prevQuranStyles.translationFontScale !== nextQuranStyles.translationFontScale;

/**
 * Check whether the font has changed or not between 2 renders. We consider the font
 * has changed also when the number of lines in indopak has changed or when the word
 * by word tooltip locale has changed.
 */
export const verseFontChanged = (
  prevQuranStyles,
  nextQuranStyles,
  prevWords,
  nextWords
) =>
  prevQuranStyles.mushafLines !== nextQuranStyles.mushafLines ||
  prevWords.length !== nextWords.length ||
  prevWords[0].text !== nextWords[0].text ||
  prevWords[0].translation.languageName !==
    nextWords[0].translation.languageName;
