/* eslint-disable import/no-anonymous-default-export */
import {
  QuranFont,
  MushafLines,
  ReadingPreference,
} from "src/constants/QuranReader";
import SliceName from "../constants/SliceNames";

export const DEFAULT_RECITER = {
  id: 7,
  name: "Mishari Rashid al-`Afasy",
  recitationStyle: "Warsh",
  relativePath: "mishaari_raashid_al_3afaasee",
};

export const DEFAULT_TRANSLATIONS = [55];

const TRANSLATIONS_INITIAL_STATE = {
  selectedTranslations: DEFAULT_TRANSLATIONS,
  isUsingDefaultTranslations: true,
};

const QURAN_READER_STYLES_INITIAL_STATE = {
  // the base sizes in rem
  tafsirFontScale: 3,
  quranTextFontScale: 3,
  translationFontScale: 3,
  quranFont: QuranFont.QPCHafs,
  mushafLines: MushafLines.SixteenLines,
  isUsingDefaultFont: true,
};

const DEFAULT_WBW_TRANSLATION = 20;
const DEFAULT_WBW_TRANSLITERATION = 12;
const DEFAULT_WBW_LOCALE = "uz";

const READING_PREFERENCES_INITIAL_STATE = {
  readingPreference: ReadingPreference.Translation,
  showWordByWordTranslation: false,
  selectedWordByWordTranslation: DEFAULT_WBW_TRANSLATION,
  showWordByWordTransliteration: false,
  selectedWordByWordTransliteration: DEFAULT_WBW_TRANSLITERATION,
  selectedWordByWordLocale: DEFAULT_WBW_LOCALE,
  isUsingDefaultWordByWordLocale: true,
  // showTooltipFor: [WordByWordType.Translation],
  // wordClickFunctionality: WordClickFunctionality.PlayAudio,
};

const THEME_INITIAL_STATE = {
  type: "main",
};

const AUDIO_INITIAL_STATE = {
  enableAutoScrolling: true,
  isDownloadingAudio: false,
  showTooltipWhenPlayingAudio: false,
};

export const DEFAULT_XSTATE_INITIAL_STATE = {
  playbackRate: 1,
  reciterId: DEFAULT_RECITER.id,
};

export const DefaultSettings = {
  [SliceName.THEME]: THEME_INITIAL_STATE,
  [SliceName.READING_PREFERENCES]: READING_PREFERENCES_INITIAL_STATE,
  [SliceName.QURAN_READER_STYLES]: QURAN_READER_STYLES_INITIAL_STATE,
  [SliceName.TRANSLATIONS]: TRANSLATIONS_INITIAL_STATE,
  [SliceName.AUDIO_PLAYER_STATE]: AUDIO_INITIAL_STATE,
};
