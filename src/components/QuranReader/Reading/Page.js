import { useMemo } from "react";
import groupLinesByVerses from "./groupLinesByVerses";
import Line from "./Line";

const Page = (props) => {
  const { verses, pageNumber, quranReaderStyles, pageIndex } = props;
  const lines = useMemo(
    () => (verses && verses.length ? groupLinesByVerses(verses) : {}),
    [verses]
  );

  //   console.log("lines", lines);
  const { quranTextFontScale, quranFont, mushafLines } = quranReaderStyles;

  return (
    <div>
      {Object.keys(lines).map((key, lineIndex) => (
        <Line
          pageIndex={pageIndex}
          lineIndex={lineIndex}
          lineKey={key}
          words={lines[key]}
          key={key}
          //   isBigTextLayout={isBigTextLayout}
          quranReaderStyles={quranReaderStyles}
        />
      ))}
    </div>
  );
};

export default Page;
