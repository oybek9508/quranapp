import { areArraysEqual } from "./array";

export const QueryParamValueType = {
  String: "String",
  Number: "Number",
  ArrayOfNumbers: "ArrayOfNumbers",
  ArrayOfStrings: "ArrayOfStrings",
};

export const equalityCheckerByType = {
  [QueryParamValueType.ArrayOfNumbers]: areArraysEqual,
  [QueryParamValueType.ArrayOfStrings]: areArraysEqual,
  [QueryParamValueType.String]: (a, b) => a === b,
  [QueryParamValueType.Number]: (a, b) => a === b,
};

export const getQueryParamValueByType = (paramStringValue, valueType) => {
  const parse = paramValueParser[valueType];
  const parsedValue = parse(paramStringValue);
  return parsedValue;
};
