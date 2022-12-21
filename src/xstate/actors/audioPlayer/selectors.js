export const selectIsVerseBeingPlayed = (state, verseKey) => {
  const { surah, ayahNumber } = state.context;
  return (
    state.matches("VISIBLE.AUDIO_PLAYER_INITIATED.PLAYING") &&
    makeVerseKey(surah, ayahNumber) === verseKey
  );
};

export const selectIsVerseLoading = (state, verseKey) => {
  const { surah, ayahNumber } = state.context;
  return selectIsLoading(state) && makeVerseKey(surah, ayahNumber) === verseKey;
};
