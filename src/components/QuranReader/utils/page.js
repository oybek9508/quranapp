export const getNumberOfPages = (numberOfVerses, versesPerPage) =>
  Math.ceil(numberOfVerses / versesPerPage);
