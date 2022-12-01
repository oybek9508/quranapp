import axios from "axios";
import { api, BASE_URL } from "./api";
import useSWR from "swr";

const useSingleChapterTranslation = ({
  chapter_number,
  lang,
  //   fields,
  //   juz_number,
  //   page_number,
  //   hizb_number,
  //   rub_number,
  //   verse_key,
}) => {
  const fetcher = (url) => api.callApi({ url }).then((res) => res.data);

  const { data, error } = useSWR(
    `${BASE_URL}/quran/translations/${lang}?chapter_number=${chapter_number}`,
    fetcher
  );

  console.log("translation data", data);

  return { data, error, isLoading: !data && !error };
};

export { useSingleChapterTranslation };
