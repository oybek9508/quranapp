import useSWR from "swr";
import { api, BASE_URL } from "./api";

const useUthmaniTajweedScript = () => {
  const fetcher = (url) => api.callApi({ url }).then((res) => res.data);

  const { data, error } = useSWR(
    `${BASE_URL}/quran/verses/uthmani_tajweed`,
    fetcher
  );
  return { data, error, isLoading: !data && !error };
};

export { useUthmaniTajweedScript };
