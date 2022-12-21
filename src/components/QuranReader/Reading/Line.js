import { Grid } from "@mui/material";
import { useContext } from "react";
import { useSelector as useXstateSelector } from "@xstate/react";
import { AudioPlayerMachineContext } from "src/xstate/AudioPlayerMachineContext";
import ChapterHeader from "src/components/chapters/ChapterHeader";
import VerseText from "src/components/verse/VerseText";
import { getWordDataByLocation } from "src/utils/verse";

const Line = (props) => {
  const { lineKey, words, isBigTextLayout, pageIndex, lineIndex } = props;
  const audioService = useContext(AudioPlayerMachineContext);
  const firstWordData = getWordDataByLocation(words[0].location);

  const isHighlighted = useXstateSelector(audioService, (state) => {
    const { surah, ayahNumber } = state.context;
    const verseKeys = words.map((word) => word.verseKey);
    return verseKeys.includes(`${surah}:${ayahNumber}`);
  });

  const shouldShowChapterHeader =
    firstWordData[1] === "1" && firstWordData[2] === "1";

  const { chapterId } = firstWordData;
  return (
    <Grid>
      {shouldShowChapterHeader && (
        <ChapterHeader
          chapterId={firstWordData[0]}
          pageNumber={words[0].pageNumber}
          hizbNumber={words[0].hizbNumber}
        />
      )}
      <Grid
        sx={{
          textAlign: "center",
          marginInline: "auto",
          width: "75vh",
        }}
      >
        <VerseText isReadingMode words={words} isHighlighted={isHighlighted} />
      </Grid>
    </Grid>
  );
};

export default Line;
