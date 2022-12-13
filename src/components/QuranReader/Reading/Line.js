import React from "react";
import VerseText from "src/components/verse/VerseText";
import { getWordDataByLocation } from "src/utils/verse";

const Line = (props) => {
  const { lineKey, words, isBigTextLayout, pageIndex, lineIndex } = props;
  console.log({ words });
  const firstWordData = getWordDataByLocation(words[0].location);

  console.log("firstWordData", firstWordData);

  const { chapterId } = firstWordData;
  return (
    <div>
      <VerseText isReadingMode words={words} />
    </div>
  );
};

export default Line;
