import useSWR from "swr";
import { api, BASE_URL } from "./api";
import { makeFootnoteUrl } from "./apiPaths";

export const useSingleChapterTranslation = ({
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

	const { data, error } = useSWR(`${BASE_URL}/quran/translations/${lang}?chapter_number=${chapter_number}`, fetcher);

	return { data, error, isLoading: !data && !error };
};

export const getFootnote = (footnoteId) => fetcher(makeFootnoteUrl(footnoteId));
