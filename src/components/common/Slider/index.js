import React, { memo } from "react";

import * as SliderPrimitive from "@radix-ui/react-slider";
import { Box, useTheme } from "@mui/material";

export const Orientation = {
  Horizontal: "horizontal",
  Vertical: "vertical",
};

export const Direction = {
  ltr: "ltr",
  rtl: "rtl",
};

export const SliderVariant = {
  Primary: "primary",
  Secondary: "secondary",
};

const TrackSlider = ({
  label,
  name,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  minStepsBetweenThumbs = 0,
  direction = Direction.ltr,
  orientation = Orientation.Horizontal,
  disabled = false,
  defaultValue,
  value,
  showThumbs = true,
  variant = SliderVariant.Primary,
  withBackground = false,
}) => {
  const theme = useTheme();
  const values = value || defaultValue;

  return (
    <Box sx={{ width: "100%", marginTop: "-14px" }}>
      <SliderPrimitive.Root
        min={min}
        max={max}
        step={step}
        minStepsBetweenThumbs={minStepsBetweenThumbs}
        dir={direction}
        orientation={orientation}
        disabled={disabled}
        aria-label={label}
        {...(defaultValue && { defaultValue })}
        {...(value && { value })}
        {...(onValueChange && { onValueChange })}
        {...(name && { name })}
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          useSelect: "none",
          touchAction: "none",
          //   backgroundColor: "red",
        }}
      >
        <SliderPrimitive.Track
          style={{
            position: "relative",
            flexGrow: 1,
            height: "3px",
            opacity: 0.3,
            backgroundColor: withBackground && theme.palette.grey[600],
          }}
        >
          <SliderPrimitive.Range
            style={{
              position: "absolute",
              height: "100%",
              backgroundColor: theme.palette.grey[600],
            }}
          />
        </SliderPrimitive.Track>
        {showThumbs &&
          values.map((...[, index]) => (
            <SliderPrimitive.Thumb
              key={index}
              style={{
                display: "block",
                width: "13px",
                height: "13px",
                backgroundColor: theme.palette.text.primary,
                borderRadius: "50%",
              }}
            />
          ))}
      </SliderPrimitive.Root>
    </Box>
  );
};
export default memo(TrackSlider);
