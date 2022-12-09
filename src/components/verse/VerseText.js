import { useMemo, useRef } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { selectQuranReaderStyles } from "src/redux/slices/QuranReader/styles";
import { getFirstWordOfSurah } from "src/utils/verse";
import isCenterAlignedPage from "./pageUtils";

const VerseText = ({ words, isReadingMode = false }) => {
  const textRef = useRef(null);
  const { quranFont, quranTextFontScale, mushafLines } = useSelector(
    selectQuranReaderStyles,
    shallowEqual
  );

  const [firstWord] = words;
  const { lineNumber, pageNumber, location, verseKey, hizbNumber } = firstWord;

  const centerAlignPage = useMemo(
    () => isCenterAlignedPage(pageNumber, lineNumber, quranFont),
    [pageNumber, lineNumber, quranFont]
  );

  //   const firstWordData = getFirstWordOfSurah(location);

  return <div>VerseText</div>;
};

export default VerseText;
