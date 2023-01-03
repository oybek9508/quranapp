import { useRouter } from "next/router";
import { useSelector, shallowEqual } from "react-redux";
import QueryParam from "src/constants/QuranParam";
import { selectSelectedTranslations } from "src/redux/slices/QuranReader/translations";
import { areArraysEqual } from "src/utils/array";
import { QueryParamValueType } from "src/utils/query-params";
import { isValidTranslationsQueryParamValue } from "src/utils/queryParamValidator";

const QUERY_PARAMS_DATA = {
  [QueryParam.Translations]: {
    reduxSelector: selectSelectedTranslations,
    reduxEqualityFunction: areArraysEqual,
    valueType: QueryParamValueType.ArrayOfNumbers,
    validate: (val) => isValidTranslationsQueryParamValue(val),
  },
  [QueryParam.WBW_LOCALE]: {
    // reduxSelector: selectWordByWordLocale,
    reduxEqualityFunction: shallowEqual,
    valueType: QueryParamValueType.String,
    validate: (val) => true,
  },
};

const useGetQueryParamOrReduxValue = (queryParam) => {
  const { query, isReady } = useRouter();
  let useSelectorArguments = [QUERY_PARAMS_DATA[queryParam].reduxSelector];
  if (QUERY_PARAMS_DATA[queryParam].reduxEqualityFunction) {
    useSelectorArguments = [
      QUERY_PARAMS_DATA[queryParam].reduxSelector,
      // @ts-ignore
      QUERY_PARAMS_DATA[queryParam].reduxEqualityFunction,
    ];
  }
  // @ts-ignore
  const selectedValue = useSelector(...useSelectorArguments);
  const valueDetails = {
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

  return valueDetails;
};

export default useGetQueryParamOrReduxValue;
