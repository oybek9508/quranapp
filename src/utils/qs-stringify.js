import _ from "lodash";
const defaultStringifyFunction = (key, value) => value;
const defaultEq = "=";
const defaultSep = "&";
const defaultConfig = {
  eq: defaultEq,
  sep: defaultSep,
  fn: defaultStringifyFunction,
  prefix: "",
};

const stringify = (obj, config = defaultConfig) => {
  const { eq, sep, fn, prefix } = { ...defaultConfig, ...config };
  if (_.isNull(obj) || !_.isObject(obj)) {
    return "";
  }

  return Object.entries(obj)
    .filter(([, value]) => value !== null)
    .map(([key, value]) => {
      if (_.isArray(value)) {
        return encode(key, value.join(","), { eq, fn, prefix });
      }
      if (_.isObject(value)) {
        return stringify(value, { eq, sep, fn, prefix: getKey(key, prefix) });
      }
      return encode(key, value, { eq, fn, prefix });
    })
    .join(sep);
};

const getKey = (key, prefix) => {
  const encodedKey = encodeURIComponent(key);
  if (prefix) return `${prefix}[${encodedKey}]`;
  return encodedKey;
};

const encode = (
  key,
  value,
  { eq = defaultEq, fn = defaultStringifyFunction, prefix = "" }
) => {
  const newValue = encodeURIComponent(fn(key, value));
  const newKey = getKey(key, prefix);

  return [newKey, newValue].join(eq);
};

export default stringify;
