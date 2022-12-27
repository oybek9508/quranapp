import { useState, useMemo, useRef, useEffect, useContext } from "react";
import { useSelector as useXstateSelector } from "@xstate/react";

import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import useSWRImmutable from "swr/immutable";

import ChapterHeader from "src/components/chapters/ChapterHeader";

import {
  getTranslationViewRequestKey,
  verseFetcher,
} from "src/components/QuranReader/api";

import TranslationViewCell from "./TranslationViewCell";
import { getTranslationsInitialState } from "src/redux/defaultSettings/util";
import { selectIsUsingDefaultWordByWordLocale } from "src/redux/slices/QuranReader/readingPreferences";
import { selectIsUsingDefaultFont } from "src/redux/slices/QuranReader/styles";
import { selectIsUsingDefaultTranslations } from "src/redux/slices/QuranReader/translations";
import { getMushafId } from "src/utils/api";
import { toLocalizedNumber } from "src/utils/locale";
import { selectIsUsingDefaultReciter } from "src/xstate/actors/audioPlayer/selectors";
import { AudioPlayerMachineContext } from "src/xstate/AudioPlayerMachineContext";
import { areArraysEqual } from "src/utils/array";
import { QuranReaderDataType } from "src/constants/QuranReader";

const TranslationPage = ({
  pageNumber,
  quranReaderType,
  quranReaderStyles,
  setApiPageToVersesMap,
  // selectedTranslations,
  // wordByWordLocale,
  // reciterId,
  initialData,
  resourceId,
}) => {
  const router = useRouter();
  const defaultTranslations =
    getTranslationsInitialState().selectedTranslations;
  const translationParams = useMemo(
    () =>
      router.query.translations
        ?.split(",")
        ?.map((translation) => Number(translation)),
    [router.query.translations]
  );

  const audioService = useContext(AudioPlayerMachineContext);

  const isUsingDefaultReciter = useXstateSelector(audioService, (state) =>
    selectIsUsingDefaultReciter(state)
  );
  const isUsingDefaultWordByWordLocale = useSelector(
    selectIsUsingDefaultWordByWordLocale
  );
  const isUsingDefaultTranslations = useSelector(
    selectIsUsingDefaultTranslations
  );
  const isUsingDefaultFont = useSelector(selectIsUsingDefaultFont);

  const shouldUseInitialData =
    pageNumber === 1 &&
    isUsingDefaultFont &&
    isUsingDefaultReciter &&
    isUsingDefaultWordByWordLocale &&
    isUsingDefaultTranslations &&
    (!translationParams ||
      areArraysEqual(defaultTranslations, translationParams));

  const { data: verses } = useSWRImmutable(
    getTranslationViewRequestKey({
      quranReaderType,
      pageNumber,
      initialData,
      quranReaderStyles,
      //   selectedTranslations,
      isVerseData: quranReaderType === QuranReaderDataType.Verse,
      id: resourceId,
      reciter: 7,
      //   locale: lang,
      //   wordByWordLocale,
    }),
    verseFetcher,
    {
      fallbackData: shouldUseInitialData ? initialData.verses : null,
      revalidateOnMount: !shouldUseInitialData,
    }
  );

  const mushafId = getMushafId(
    quranReaderStyles.quranFont,
    quranReaderStyles.mushafLines
  ).mushaf;

  useEffect(() => {
    if (verses) {
      // @ts-ignore
      setApiPageToVersesMap((prevMushafPageToVersesMap) => ({
        ...prevMushafPageToVersesMap,
        [pageNumber]: verses,
      }));
    }
  }, [pageNumber, setApiPageToVersesMap, verses]);

  return (
    <div>
      {verses.map((verse, index) => {
        const currentVerseIndex =
          pageNumber === 1
            ? index
            : index + (pageNumber - 1) * initialData.pagination.perPage;
        return (
          <div key={currentVerseIndex}>
            {verse.verseNumber === 1 && (
              <ChapterHeader
                // translationName={getTranslationNameString(verse.translations)}
                chapterId={String(verse.chapterId)}
                pageNumber={verse.pageNumber}
                hizbNumber={verse.hizbNumber}
                // isTranslationSelected={selectedTranslations?.length > 0}
              />
            )}
            <TranslationViewCell
              verseIndex={currentVerseIndex}
              verse={verse}
              key={verse.id}
              quranReaderStyles={quranReaderStyles}
            />
          </div>
        );
      })}
    </div>
  );
};

export default TranslationPage;
