import React, { useState, useCallback } from "react";

import { useDispatch } from "react-redux";
import Popover, { ContentSide } from "src/components/common/Popover";

const ReadingViewWordPopover = ({ word, children }) => {
  const [isTooltipOpened, setIsTooltipOpened] = useState(false);
  const dispatch = useDispatch();

  //   const onOpenChange = useCallback(
  //     (isOpen) => {
  //       setIsTooltipOpened(isOpen);
  //       // eslint-disable-next-line i18next/no-literal-string
  //       logEvent(`reading_view_overflow_menu_${isOpen ? "open" : "close"}`);
  //       dispatch(setReadingViewSelectedVerseKey(isOpen ? word.verseKey : null));
  //     },
  //     [dispatch, word.verseKey]
  //   );

  //   const onHoverChange = useCallback(
  //     (isHovering) => {
  //       dispatch(
  //         setReadingViewHoveredVerseKey(isHovering ? word.verseKey : null)
  //       );
  //     },
  //     [dispatch, word.verseKey]
  //   );
  //   const onActionTriggered = useCallback(() => {
  //     onOpenChange(false);
  //   }, [onOpenChange]);

  //   const onMouseEnter = useCallback(() => {
  //     onHoverChange(true);
  //   }, [onHoverChange]);

  //   const onMouseLeave = useCallback(() => {
  //     onHoverChange(false);
  //   }, [onHoverChange]);

  //   const onTouchMove = useCallback(() => {
  //     onOpenChange(false);
  //   }, [onOpenChange]);

  return (
    <Popover
      contentSide={ContentSide.TOP}
      contentSideOffset={-10}
      trigger={
        <div
        //   onMouseEnter={onMouseEnter}
        //   onMouseLeave={onMouseLeave}
        //   onTouchMove={onTouchMove}
        >
          {children}
        </div>
      }
      tip
      isModal
      open={isTooltipOpened}
      //   onOpenChange={onOpenChange}
      //   triggerStyles={styles.trigger}
      //   contentStyles={styles.content}
      defaultStyling={false}
    >
      ReadingViewWordPopover
    </Popover>
  );
};

export default ReadingViewWordPopover;
