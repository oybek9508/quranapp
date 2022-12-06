import { BASE_URL, HOME_URL, api, fetcher } from "./api";
import useSWR from "swr";
import qs from "qs";
import axios from "axios";
import { makePagesLookupUrl, makeVersesByPageUrl } from "./apiPaths";

const getVersesByPage = async (id, locale, params) =>
  fetcher(makeVersesByPageUrl(id, locale, params));

export const getPagesLookup = async (params) =>
  fetcher(makePagesLookupUrl(params));

export { getVersesByPage };
