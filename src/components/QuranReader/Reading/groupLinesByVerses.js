import groupBy from "lodash/groupBy";
import { getVerseWords } from "src/utils/verse";

/**
 * Groups verses into lines to match the Quran Page (Madani Mushaf) layout
 * The returning value is an object containing the page and line number as a key,
 * and array of word for the value. E.g.
 * {
 *  Page1-Line2: [words],
 *  Page1-Line3: [words]
 *  ...
 * }
 */
const groupLinesByVerses = (verses) => {
  let words = [];

  // Flattens the verses into an array of words
  verses.forEach((verse) => {
    words = [...words, ...getVerseWords(verse, true)];
  });

  // Groups the words based on their (page and) line number
  const lines = groupBy(
    words,
    (word) => `Page${word.pageNumber}-Line${word.lineNumber}`
  );

  return lines;
};

export default groupLinesByVerses;
