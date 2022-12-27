import { useEffect, memo, useContext } from "react";
import { useSelector as useSelectorXstate } from "@xstate/react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import {
  verseFontChanged,
  verseTranslationChanged,
  verseTranslationFontChanged,
} from "../utils/memoization";

const TranslationViewCell = () => {
  return <div>TranslationViewCell</div>;
};

export default TranslationViewCell;
