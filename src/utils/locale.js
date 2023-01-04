export const LANG_LOCALE_MAP = {
  en: "en-US",
  ar: "ar-EG",
  bn: "bn-BD",
  fa: "fa-IR",
  fr: "fr-FR",
  id: "id-ID",
  it: "it-IT",
  nl: "nl-NL",
  pt: "pt-BR",
  ru: "ru-RU",
  sq: "sq-AL",
  th: "th-TH",
  tr: "tr-TR",
  ur: "ur-PK",
  zh: "zh-CN",
  ms: "ms-MY",
};

export const getLangFullLocale = (locale) => LANG_LOCALE_MAP[locale];

let numberFormatter = null;
let currentLanguageLocale = null;
const getFormattedNumber = (formatter, value, showLeadingZero) => {
  const formattedNumber = formatter.format(value);
  if (!showLeadingZero || value >= 10) {
    return formattedNumber;
  }
  return `${formatter.format(0)}${formattedNumber}`;
};

export const toLocalizedNumber = (
  value,
  locale,
  showLeadingZero = false,
  options
) => {
  if (numberFormatter && currentLanguageLocale === locale) {
    return getFormattedNumber(numberFormatter, value, showLeadingZero);
  }
  currentLanguageLocale = locale;
  const fullLocale = LANG_LOCALE_MAP[locale];
  numberFormatter = new (fullLocale, options)();
  return getFormattedNumber(numberFormatter, value, showLeadingZero);
};
