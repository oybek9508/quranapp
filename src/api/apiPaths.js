import { makeUrl, ITEMS_PER_PAGE } from "./api";
import { QuranFont } from "src/constants/QuranReader";

import { DEFAULT_RECITER } from "src/redux/defaultSettings";
import {
  getReadingPreferencesInitialState,
  getTranslationsInitialState,
} from "src/redux/defaultSettings/util";

const DEFAULT_VERSES_PARAMS = {
  words: true,
  translationFields: "resource_name,language_id",
  fields: `${QuranFont.Uthmani},chapter_id,hizb_number,text_imlaei_simple`,
  perPage: ITEMS_PER_PAGE,
};

const getVersesParams = (
  currentLocale,
  params,
  includeTranslationFields = true
) => {
  const defaultParams = {
    ...DEFAULT_VERSES_PARAMS,
    translations:
      getTranslationsInitialState(currentLocale).selectedTranslations.join(
        ", "
      ),
    reciter: DEFAULT_RECITER.id,
    wordTranslationLanguage:
      getReadingPreferencesInitialState(currentLocale).selectedWordByWordLocale,
  };

  if (!includeTranslationFields) {
    delete defaultParams.translationFields;
    delete defaultParams.translations;
  }

  return {
    ...defaultParams,
    ...params,
  };
};

export const makeVersesUrl = (id, currentLocale, params) =>
  makeUrl(`/verses/by_chapter/${id}`, getVersesParams(currentLocale, params));

export const makeVersesByPageUrl = (
  id,
  currentLocale,
  params,
  includeTranslationFields = true
) =>
  makeUrl(
    `/verses/by_page/${id}`,
    getVersesParams(currentLocale, params, includeTranslationFields)
  );

export const makeJuzUrl = (id, currentLocale, params) =>
  makeUrl(`/verses/by_juz/${id}`, getVersesParams(currentLocale, params));

export const makeChapterUrl = (chapterIdOrSlug, language) =>
  makeUrl(`/chapters/${chapterIdOrSlug}`, { language });

export const makePagesLookupUrl = (params) => makeUrl("/pages/lookup", params);

export const makeChapterAudioDataUrl = (reciterId, chapter, segments) =>
  makeUrl(`/audio/reciters/${reciterId}/audio_files`, { chapter, segments });

export const makeAudioTimestampsUrl = (reciterId, verseKey) =>
  makeUrl(`/audio/reciters/${reciterId}/timestamp?verse_key=${verseKey}`);

export const makeAvailableRecitersUrl = (locale, fields) =>
  makeUrl("/audio/reciters", { locale, fields });

export const makeReciterUrl = (reciterId, locale) =>
  makeUrl(`/audio/reciters/${reciterId}`, {
    locale,
    fields: ["profile_picture", "cover_image", "bio"],
  });

export const makeChapterInfoUrl = (id) => makeUrl(`/chapters/${id}/info`);

export const makeFootnoteUrl = (footnoteId) =>
  makeUrl(`/foot_notes/${footnoteId}`);
