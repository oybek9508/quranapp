import React from "react";
import ChapterHeader from "src/components/chapters/ChapterHeader";
import VerseText from "src/components/verse/VerseText";
import { getWordDataByLocation } from "src/utils/verse";

const Line = (props) => {
  const { lineKey, words, isBigTextLayout, pageIndex, lineIndex } = props;
  console.log({ words });
  const firstWordData = getWordDataByLocation(words[0].location);

  const shouldShowChapterHeader =
    firstWordData[1] === "1" && firstWordData[2] === "1";

  console.log("firstWordData", firstWordData);

  const { chapterId } = firstWordData;
  return (
    <div>
      {/* {shouldShowChapterHeader && (
        <ChapterHeader
          chapterId={firstWordData[0]}
          pageNumber={words[0].pageNumber}
          hizbNumber={words[0].hizbNumber}
        />
      )} */}
      <div>
        <VerseText isReadingMode words={words} />
      </div>
    </div>
  );
};

export default Line;
