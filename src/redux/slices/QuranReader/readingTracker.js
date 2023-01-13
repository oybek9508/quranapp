import { createSlice } from "@reduxjs/toolkit";
import SliceName from "src/redux/constants/SliceNames";
import { getDistanceBetweenVerses } from "src/utils/verse";

const initialState = {
  lastReadVerse: { verseKey: null, chapterId: null, page: null, hizb: null },
  recentReadingSessions: {},
};

const NEW_SESSION_BOUNDARY = 20;
const MAXIMUM_NUMBER_OF_SESSIONS = 10;

const readingTracker = createSlice({
  name: SliceName.READING_TRACKER,
  initialState,
  reducers: {
    setLastReadVerse: (state, action) => {
      const { lastReadVerse, chaptersData } = action.payload;
      let newRecentReadingSessions = { ...state.recentReadingSessions };
      // if the verse key already exists, and he re-visited it again, we need to mark it as the latest session.
      if (newRecentReadingSessions[lastReadVerse.verseKey]) {
        // delete the old entry
        delete newRecentReadingSessions[lastReadVerse.verseKey];
        // insert the same entry again but at the beginning
        newRecentReadingSessions = {
          [lastReadVerse.verseKey]: +new Date(),
          ...newRecentReadingSessions,
        };
        return generateNewState(state, lastReadVerse, newRecentReadingSessions);
      }
      const sessionsVerseKeys = Object.keys(newRecentReadingSessions);
      const numberOfSessions = sessionsVerseKeys.length;
      const [lastReadingSessionVerseKey] = sessionsVerseKeys;
      // if there are some last read sessions already and the new verse key is not far enough to be considered a new session
      if (
        numberOfSessions &&
        getDistanceBetweenVerses(
          chaptersData,
          lastReadingSessionVerseKey,
          lastReadVerse.verseKey
        ) <= NEW_SESSION_BOUNDARY
      ) {
        delete newRecentReadingSessions[lastReadingSessionVerseKey];
        newRecentReadingSessions = {
          [lastReadVerse.verseKey]: +new Date(),
          ...newRecentReadingSessions,
        };
        return generateNewState(state, lastReadVerse, newRecentReadingSessions);
      }
      const earliestSession = sessionsVerseKeys[numberOfSessions - 1];
      // insert a new entry at the beginning
      newRecentReadingSessions = {
        [lastReadVerse.verseKey]: +new Date(),
        ...newRecentReadingSessions,
      };
      // if the number of sessions already exceeded the maximum, delete the latest session
      if (numberOfSessions + 1 > MAXIMUM_NUMBER_OF_SESSIONS) {
        delete newRecentReadingSessions[earliestSession];
      }
      return generateNewState(state, lastReadVerse, newRecentReadingSessions);
    },
  },
});

const generateNewState = (state, lastReadVerse, newRecentReadingSessions) => {
  return {
    ...state,
    lastReadVerse,
    recentReadingSessions: newRecentReadingSessions,
  };
};

export const { setLastReadVerse } = readingTracker.actions;

export const selectLastReadVerseKey = (state) =>
  state.readingTracker.lastReadVerse;

export const selectedLastReadPage = (state) =>
  state.readingTracker.lastReadVerse.page;

export const selectIsVerseKeySelected = (verseKey) => (state) => {
  const lastReadVerseKey = selectLastReadVerseKey(state);
  return verseKey === lastReadVerseKey.verseKey;
};

export default readingTracker.reducer;
