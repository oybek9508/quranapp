export const getObservedVersePayload = (element) => ({
  verseKey: element.getAttribute("data-verse-key"),
  chapterId: element.getAttribute("data-chapter-id"),
  page: element.getAttribute("data-page"),
  hizb: element.getAttribute("data-hizb"),
});
