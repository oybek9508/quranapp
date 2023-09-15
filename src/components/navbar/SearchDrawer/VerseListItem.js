import { useEffect } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { selectIsVerseKeySelected } from "src/redux/slices/QuranReader/readingTracker";
import { getVerseNumberFromKey } from "src/utils/verse";
import { toLocalizedNumber } from "src/utils/locale";
import { getChapterWithStartingVerseUrl } from "src/utils/navigation";
import { Grid, ListItemButton } from "@mui/material";

const VerseListItem = ({ verseKey }) => {
  const isVerseKeySelected = useSelector(selectIsVerseKeySelected(verseKey));

  const verseNumber = getVerseNumberFromKey(verseKey);
  //   const localizedVerseNumber = toLocalizedNumber(verseNumber);

  return (
    <Link
      href={getChapterWithStartingVerseUrl(verseKey)}
      key={verseKey}
      isShallow
      shouldPrefetch={false}
    >
      <ListItemButton sx={{ display: "flex", px: 2 }}>
        {verseNumber}
      </ListItemButton>
    </Link>
  );
};

export default VerseListItem;
