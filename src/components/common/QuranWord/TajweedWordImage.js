/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import { makeCDNUrl } from "src/utils/cdn";

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
  //   const { quranTextFontScale } = useSelector(selectQuranReaderStyles);
  return (
    <span>
      {/* <Image
        src={`${makeCDNUrl(`images/${path}`)}`}
        alt={alt}
        component="img"
        width=""
        height={16}
      /> */}
      <img src={`${makeCDNUrl(`images/${path}`)}`} alt={alt} />
    </span>
  );
};

export default TajweedWord;
