import { BASE_URL, HOME_URL, api, fetcher } from "./api";
import useSWR from "swr";
import qs from "qs";
import axios from "axios";
import { makeChapterUrl, makeVersesUrl } from "./apiPaths";

const useQuranChapters = () => {
  const fetcher = (url) => api.callApi({ url }).then((res) => res.data);
  const { data, error } = useSWR(`${BASE_URL}/chapters`, fetcher);
  return { data, error, isLoading: !data && !error };
};

const useSingleSurah = (id) => {
  const fetcher = (url) => api.callApi({ url }).then((res) => res.data);
  const { data, error } = useSWR(`${BASE_URL}/chapters/${id}`, fetcher);
  return { data, error, isLoading: !data && !error };
};

const getChapterVerses = async (id, locale, params) =>
  fetcher(makeVersesUrl(id, locale, params));

export const getChapter = async (chapterIdOrSlug, language) =>
  fetcher(makeChapterUrl(chapterIdOrSlug, language));

export const getChapterIdBySlug = async (slug, locale) => {
  try {
    const chapterResponse = await getChapter(encodeURI(slug), locale);
    return chapterResponse.chapter.id;
  } catch (error) {
    return false;
  }
};

export { getChapterVerses, useSingleSurah, useQuranChapters };
