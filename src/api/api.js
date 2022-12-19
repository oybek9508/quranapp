import axios from "axios";
import { camelizeKeys, decamelizeKeys } from "humps";
import stringify from "../utils/qs-stringify";
import { QuranFont } from "../constants/QuranReader";

export const OFFLINE_ERROR = "OFFLINE_ERROR";
export const ITEMS_PER_PAGE = 10;

// export const HOME_URL = process.env.NEXT_PUBLIC_QURAN_API_URL;
// export const BASE_URL = `${HOME_URL}/api/v4`;
export const STAGING_API_URL = process.env.NEXT_PUBLIC_QURAN_API_STAGING_URL;
export const PRODUCTION_API_URL =
  process.env.NEXT_PUBLIC_QURAN_API_PRODUCTION_URL;

// export const API_HOST =
//   process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
//     ? PRODUCTION_API_URL
//     : STAGING_API_URL;

export const API_HOST = PRODUCTION_API_URL;

export const BASE_URL = `${API_HOST}/api/qdc`;

export const makeUrl = (path, parameters) => {
  if (!parameters) {
    return `${BASE_URL}${path}`;
  }
  const decamelizedParams = decamelizeKeys(parameters);
  const queryParameters = `?${stringify(decamelizedParams)}`;
  return `${BASE_URL}${path}${queryParameters}`;
};

export const fetcher = async (input, init) => {
  if (typeof window !== "undefined" && !window.navigator.onLine) {
    throw new Error(OFFLINE_ERROR);
  }
  const res = await fetch(input, init);
  if (!res.ok || res.statue === 500 || res.status === 404) {
    throw res;
  }
  const json = await res.json();
  return camelizeKeys(json);
};

export const getDefaultWordFields = (quranFont) => ({
  wordFields: `verse_key,verse_id,page_number,location,text_indopak,text_uthmani,${quranFont}${
    quranFont === QuranFont.QPCHafs ? "" : `,${QuranFont.QPCHafs}`
  }`,
});

class API {
  callApi({ url }) {
    return axios({
      url,
      method: "GET",
    });
  }
}

export const api = new API();
