import { DefaultSettings } from ".";
import SliceName from "../constants/SliceNames";

export const getStoreInitialState = (locale) => {
  return {
    [SliceName.THEME]: getThemeInitialState(locale),
    [SliceName.READING_PREFERENCES]: getReadingPreferencesInitialState(locale),
    [SliceName.QURAN_READER_STYLES]: getQuranReaderStylesInitialState(locale),
    [SliceName.TRANSLATIONS]: getTranslationsInitialState(locale),
    //   [SliceName.TAFSIRS]: getTafsirsInitialState(locale),
    //   // @ts-ignore
    [SliceName.AUDIO_PLAYER_STATE]: getAudioPlayerStateInitialState(locale),
    //   [SliceName.DEFAULT_SETTINGS]: { isUsingDefaultSettings: true },
  };
};

const DEFAULT_LOCALE = "uz";

// const getLocaleInitialStateByKey = (locale, key) =>
//   importLocaleFile(locale)[key];

export const getThemeInitialState = (locale = DEFAULT_LOCALE) => {
  return DefaultSettings[SliceName.THEME];
};

export const getQuranReaderStylesInitialState = (locale = DEFAULT_LOCALE) => {
  return DefaultSettings[SliceName.QURAN_READER_STYLES];
};

export const getReadingPreferencesInitialState = (locale = DEFAULT_LOCALE) => {
  return DefaultSettings[SliceName.READING_PREFERENCES];
};

export const getAudioPlayerStateInitialState = () => {
  return DefaultSettings[SliceName.AUDIO_PLAYER_STATE];
};

export const getTranslationsInitialState = () => {
  return DefaultSettings[SliceName.TRANSLATIONS];
};
