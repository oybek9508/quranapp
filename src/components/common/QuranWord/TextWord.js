import React from "react";

import { decamelizeKeys } from "humps";

const DEFAULT_FONT_FAMILY = "UthmanicHafs";
const ME_QURAN = "meQuran";
const INDO_PAK = "IndoPak";

const UTHMANI_HAFS_FONTS = decamelizeKeys({
  qpcUthmaniHafs: DEFAULT_FONT_FAMILY,
  textUthmani: ME_QURAN,
  textIndopak: INDO_PAK,
});

const TextWord = ({ text, font, charType }) => (
  <span
    style={{ fontFamily: "IndoPak" }}
    // className={classNames(styles.word, {
    //   [styles[DEFAULT_FONT_FAMILY]]:
    //     charType === CharType.End ||
    //     !UTHMANI_HAFS_FONTS[font] ||
    //     UTHMANI_HAFS_FONTS[font] === DEFAULT_FONT_FAMILY,
    //   [styles[ME_QURAN]]:
    //     charType !== CharType.End && UTHMANI_HAFS_FONTS[font] === ME_QURAN,
    //   [styles[INDO_PAK]]: UTHMANI_HAFS_FONTS[font] === INDO_PAK,
    // })}
  >
    {text}
  </span>
);

export default TextWord;
