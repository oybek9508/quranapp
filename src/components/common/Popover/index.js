import React from "react";
import * as RadixPopover from "@radix-ui/react-popover";

export const ContentSide = {
  TOP: "top",
  RIGHT: "right",
  BOTTOM: "bottom",
  LEFT: "left",
};

export const ContentAlign = {
  START: "start",
  CENTER: "center",
  END: "end",
};

const Popover = ({
  children,
  trigger,
  onOpenChange,
  open,
  isModal = false,
  contentSide = ContentSide.BOTTOM,
  contentAlign = ContentAlign.CENTER,
  avoidCollisions = true,
  tip = false,
  useTooltipStyles = false,
  defaultStyling = true,
  isPortalled = true,
  contentSideOffset = 2,
  triggerStyles,
  contentStyles,
}) => {
  const content = (
    <RadixPopover.Content
      sideOffset={contentSideOffset}
      side={contentSide}
      align={contentAlign}
      avoidCollisions={avoidCollisions}
      //   className={classNames(styles.content, {
      //     [styles.tooltipContent]: useTooltipStyles,
      //     [contentStyles]: contentStyles,
      //   })}
    >
      {children}
      {tip && <RadixPopover.Arrow />}
    </RadixPopover.Content>
  );

  return (
    <div>
      <RadixPopover.Root
        modal={isModal}
        {...(typeof open !== "undefined" && { open })}
        {...(onOpenChange && { onOpenChange })}
      >
        <RadixPopover.Trigger aria-label="Open popover" asChild>
          <span
          // className={classNames(styles.trigger, {
          //   [triggerStyles]: triggerStyles,
          // })}
          >
            {trigger}
          </span>
        </RadixPopover.Trigger>
        {isPortalled ? (
          <RadixPopover.Portal>{content}</RadixPopover.Portal>
        ) : (
          content
        )}
      </RadixPopover.Root>
    </div>
  );
};

export default Popover;
