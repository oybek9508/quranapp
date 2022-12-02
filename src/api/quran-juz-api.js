import { BASE_URL, HOME_URL, api } from "./api";
import useSWR from "swr";
import axios from "axios";

const useJuzList = () => {
  const fetcher = (url) => api.callApi({ url }).then((res) => res.data);
  const { data, error } = useSWR(`${BASE_URL}/juzs`, fetcher);
  return { data, error, isLoading: !data && !error };
};

export { useJuzList };
