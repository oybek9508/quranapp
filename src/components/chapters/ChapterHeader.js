import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import ChapterIconContainer, { ChapterIconsSize } from "./ChapterIconContainer";

const CHAPTERS_WITHOUT_BISMILLAH = ["1", "9"];

const ChapterHeader = ({
  chapterId,
  pageNumber,
  hizbNumber,
  translationName,
  isTranslationSelected,
}) => {
  const dispatch = useDispatch();
  const headerRef = useRef(null);
  return (
    <div>
      <div>
        <div>
          <ChapterIconContainer id={chapterId} size={ChapterIconsSize.Mega} />
        </div>
      </div>
    </div>
  );
};

export default ChapterHeader;
