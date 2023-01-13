import { useState, useMemo, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import DataContext from "src/context/DataContext";
import { selectLastReadVerseKey } from "src/redux/slices/QuranReader/readingTracker";
import {
  generateChapterVersesKeys,
  getVerseNumberFromKey,
} from "src/utils/verse";
import { toLocalizedNumber } from "src/utils/locale";
import { getChapterWithStartingVerseUrl } from "src/utils/navigation";
import { Grid, useTheme } from "@mui/material";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import VerseListItem from "./VerseListItem";

const VerseList = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const chaptersData = useContext(DataContext);
  const lastReadVerseKey = useSelector(selectLastReadVerseKey);
  const currentChapterId = lastReadVerseKey.chapterId;

  const verseKeys = useMemo(
    () =>
      currentChapterId
        ? generateChapterVersesKeys(chaptersData, currentChapterId)
        : [],
    [chaptersData, currentChapterId]
  );

  const filteredVerseKeys = verseKeys.filter((verseKey) => {
    const verseNumber = getVerseNumberFromKey(verseKey);
    const localizedVerseNumber = toLocalizedNumber(verseNumber);
    return (
      localizedVerseNumber.toString().startsWith(searchQuery) ||
      verseNumber.toString().startsWith(searchQuery)
    );
  });

  // Handle when user press `Enter` in input box
  const handleVerseInputSubmit = (e) => {
    e.preventDefault();
    const firstFilteredVerseKey = filteredVerseKeys[0];
    if (firstFilteredVerseKey) {
      router.push(
        getChapterWithStartingVerseUrl(firstFilteredVerseKey),
        undefined,
        {
          shallow: true, // https://nextjs.org/docs/routing/shallow-routing
        }
      );
    }
  };
  console.log("lastReadVerseKey :>> ", lastReadVerseKey);
  console.log("filteresVerseKeys", filteredVerseKeys);

  return (
    <Grid sx={{ pl: 2 }}>
      <form>
        <input
          style={{
            boxSizing: "border-box",
            border: "none",
            width: "100%",
            height: "40px",
            paddingLeft: "16px",
            paddingRight: "16px",
            backgroundColor: theme.palette.background.default,
            outline: "none",
            "&::placeholder": {
              fontSize: "18px",
            },
          }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Verse"
        />
      </form>
      <Grid sx={{ flex: 1, position: "relative", mt: 2 }}>
        <List
          sx={{
            overflowY: "scroll",
            position: "absolute",
            height: "inherit",
            width: "100%",
          }}
        >
          {["1:1", "1:2", "1:3", "1:4", "1:5", "1:6", "1:7"].map((verseKey) => {
            console.log({ verseKey });
            return <VerseListItem verseKey={verseKey} key={verseKey} />;
          })}
        </List>
      </Grid>
    </Grid>
  );
};

export default VerseList;
