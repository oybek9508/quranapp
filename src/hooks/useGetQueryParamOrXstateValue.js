import { useContext } from "react";

import { useSelector as useXstateSelector } from "@xstate/react";
import { useRouter } from "next/router";

// import {
//   equalityCheckerByType,
//   getQueryParamValueByType,
//   QueryParamValueType,
// } from "@/utils/query-params";
import { isValidReciterId } from "src/utils/queryParamValidator";
import { AudioPlayerMachineContext } from "src/xstate/AudioPlayerMachineContext";
import QueryParam from "src/constants/QuranParam";
import {
  equalityCheckerByType,
  getQueryParamValueByType,
  QueryParamValueType,
} from "src/utils/query-params";

const QUERY_PARAMS_DATA = {
  [QueryParam.Reciter]: {
    selector: (state) => state.context.reciterId,
    valueType: QueryParamValueType.Number,
    validate: isValidReciterId,
  },
};

/**
 * A hook that searches the query params of the url for specific values,
 * parses them if found and if not, falls back to the Redux value and detects
 * when there is a mismatch between the query param value and the Redux value.
 */
const useGetQueryParamOrXstateValue = (queryParam) => {
  const { query, isReady } = useRouter();
  const audioService = useContext(AudioPlayerMachineContext);
  const { selector } = QUERY_PARAMS_DATA[queryParam];

  const selectedValue = useXstateSelector(audioService, selector);
  const defaultValueDetails = {
    value: selectedValue,
    isQueryParamDifferent: false,
  };

  // if the param exists in the url
  if (isReady && query[queryParam]) {
    const { validate, valueType } = QUERY_PARAMS_DATA[queryParam];

    const paramStringValue = String(query[queryParam]);
    const isValidValue = validate(paramStringValue);
    if (!isValidValue) {
      return { isQueryParamDifferent: false, value: selectedValue };
    }

    const parsedQueryParamValue = getQueryParamValueByType(
      paramStringValue,
      valueType
    );
    const checkEquality = equalityCheckerByType[valueType];
    const isQueryParamDifferent = !checkEquality(
      parsedQueryParamValue,
      selectedValue
    );

    return {
      value: parsedQueryParamValue,
      isQueryParamDifferent,
    };
  }
  return defaultValueDetails;
};

export default useGetQueryParamOrXstateValue;
