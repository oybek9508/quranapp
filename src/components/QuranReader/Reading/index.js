import { useEffect, useContext, useRef, useState } from "react";
import DataContext from "src/context/DataContext";
import ReadingView from "./ReadingView";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import { selectReadingPreferences } from "src/redux/slices/QuranReader/readingPreferences";
import { ReadingPreference } from "src/constants/QuranReader";
import { selectQuranReaderStyles } from "src/redux/slices/QuranReader/styles";

const INCREASE_VIEWPORT_BY_PIXELS = 1200;

const ReadingIndex = ({ initialData, resourceId, quranReaderType }) => {
  const dispatch = useDispatch();
  const readingPreferences = useSelector(selectReadingPreferences);
  const quranReaderStyles = useSelector(selectQuranReaderStyles, shallowEqual);
  const isReadingPreference = readingPreferences === ReadingPreference.Reading;
  console.log("initialData", initialData);
  console.log("resourceId", resourceId);
  const chaptersData = useContext(DataContext);
  return (
    <div>
      <ReadingView
        initialData={initialData}
        resourceId={resourceId}
        quranReaderType={quranReaderType}
        isReadingPreference={isReadingPreference}
        quranReaderStyles={quranReaderStyles}
      />
    </div>
  );
};

export default ReadingIndex;
