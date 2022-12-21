import { api, BASE_URL, fetcher } from "./api";
import useSWR from "swr";
import {
  makeAudioTimestampsUrl,
  makeAvailableRecitersUrl,
  makeChapterAudioDataUrl,
  makeReciterUrl,
} from "./apiPaths";

export const useChaperAudioForEachAyah = (recitation_id, chapter_number) => {
  const fetcher = (url) => api.callApi({ url }).then((res) => res.data);
  const { data, error } = useSWR(
    `${BASE_URL}/recitations/${recitation_id}/by_chapter/${chapter_number}`,
    fetcher
  );

  console.log("each ayah audio data", data);
  console.log("error", error);
  return { data, error, isLoading: !data && !error };
};

export const getChapterAudioData = async (
  reciterId,
  chapter,
  segments = false
) => {
  const res = await fetcher(
    makeChapterAudioDataUrl(reciterId, chapter, segments)
  );
  if (res.error) {
    throw new Error(res.error);
  }
  if (res.status === 500) {
    throw new Error("server error: fail to get audio file");
  }
  const { audioFiles: audioData } = res;
  console.log("audioData", audioData);
  const [firstAudio] = audioData;
  if (!firstAudio) {
    throw new Error("No audio file found");
  }

  return {
    ...firstAudio,
    reciterId,
  };
};

export const getAvailableReciters = async (locale, fields) =>
  fetcher(makeAvailableRecitersUrl(locale, fields));

export const getReciterData = async (reciterId, locale) =>
  fetcher(makeReciterUrl(reciterId, locale));

export const getVerseTimestamps = async (reciterId, verseKey) =>
  fetcher(makeAudioTimestampsUrl(reciterId, verseKey));
