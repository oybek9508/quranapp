import axios from "axios";
import { camelizeKeys, decamelizeKeys } from "humps";
import stringify from "../utils/qs-stringify";

console.log(
  "process.env.NEXT_PUBLIC_QURAN_API_URL",
  process.env.NEXT_PUBLIC_QURAN_API_URL
);

export const OFFLINE_ERROR = "OFFLINE_ERROR";
export const ITEMS_PER_PAGE = 10;

export const HOME_URL = process.env.NEXT_PUBLIC_QURAN_API_URL;
export const API_ROOT_PATH = "/api/v4";
export const BASE_URL = `${HOME_URL}/api/v4`;

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

class API {
  callApi({ url }) {
    return axios({
      url,
      method: "GET",
    });
  }
}

export const api = new API();
