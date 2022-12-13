import { QuranFont } from "src/constants/QuranReader";

const QCFFontCodes = [QuranFont.MadaniV1, QuranFont.MadaniV2];
export const isQCFFont = (font) => QCFFontCodes.includes(font);
