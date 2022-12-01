import { api, BASE_URL } from "./api";
import useSWR from "swr";

const useChaperAudioForEachAyah = (recitation_id, chapter_number) => {
  const fetcher = (url) => api.callApi({ url }).then((res) => res.data);
  const { data, error } = useSWR(
    `${BASE_URL}/recitations/${recitation_id}/by_chapter/${chapter_number}`,
    fetcher
  );

  console.log("each ayah audio data", data);
  console.log("error", error);
  return { data, error, isLoading: !data && !error };
};

export { useChaperAudioForEachAyah };
