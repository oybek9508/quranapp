/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { selectTheme } from "src/redux/slices/theme";
import { makeCDNUrl } from "src/utils/cdn";
import { ThemeTypes } from "src/styles/theme/modes";

const { Dark, Light, Main, Blue } = ThemeTypes;

const darkMode = "hue-rotate(274deg) saturate(500%) invert(76%) contrast(100%)";
const lightMode = "contrast(100%) hue-rotate(50deg)";

// import { makeCDNUrl } from "src/utils/cdn";

// const FONT_SIZE_CLASS_MAP = {
//   1: styles.xs,
//   2: styles.sm,
//   3: styles.md,
//   4: styles.lg,
//   5: styles.xl,
//   6: styles.xl2,
//   7: styles.xl3,
//   8: styles.xl4,
//   9: styles.xl5,
//   10: styles.xl6,
// };

const TajweedWord = ({ path, alt }) => {
  const { type } = useSelector(selectTheme, shallowEqual);
  return (
    <span
      style={{
        filter:
          ((type === Dark || type === Blue) && darkMode) ||
          (type === Light && lightMode),
      }}
    >
      <img src={`${makeCDNUrl(`images/${path}`)}`} alt={alt} />
    </span>
  );
};

export default TajweedWord;
