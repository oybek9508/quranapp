import { BASE_URL, HOME_URL, api, fetcher } from "./api";
import useSWR from "swr";
import axios from "axios";
import { makeJuzUrl } from "./apiPaths";

const useJuzList = () => {
  const fetcher = (url) => api.callApi({ url }).then((res) => res.data);
  const { data, error } = useSWR(`${BASE_URL}/juzs`, fetcher);
  return { data, error, isLoading: !data && !error };
};

const getJuzVerses = async (id, locale, params) =>
  fetcher(makeJuzUrl(id, locale, params));

export { getJuzVerses, useJuzList };
