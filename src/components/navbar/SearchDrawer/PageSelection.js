import React from "react";
import { useSelector } from "react-redux";
import { selectedLastReadPage } from "src/redux/slices/QuranReader/readingTracker";
import { selectQuranReaderStyles } from "src/redux/slices/QuranReader/styles";
import { getPageNavigationUrl } from "src/utils/navigation";
import { getPageIdsByMushaf } from "src/utils/page";
import ScrollableSelection from "./ScrollableSelection";

const PageSelection = () => {
  const { quranFont, mushafLines } = useSelector(selectQuranReaderStyles);
  const pageIds = getPageIdsByMushaf(quranFont, mushafLines);
  const lastReadPage = useSelector(selectedLastReadPage);

  console.log("lastReadPage", lastReadPage);
  return (
    <ScrollableSelection
      items={pageIds}
      getHref={getPageNavigationUrl}
      searchPlaceholder="Search page"
      renderItem={(page) => `Page ${page.label}`}
      isJuz={false}
      selectedItem={Number(lastReadPage)}
    />
  );
};

export default PageSelection;
