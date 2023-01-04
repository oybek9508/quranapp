import React, { memo } from "react";

import * as SliderPrimitive from "@radix-ui/react-slider";

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

const Slider = ({
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
  variant = "SliderVariant.Primary",
  withBackground = false,
}) => {
  const values = value || defaultValue;

  return (
    <SliderPrimitive.Slider
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
      }}
    >
      <SliderPrimitive.Track
        // className={classNames(
        //   styles.track,
        //   withBackground && styles.trackBackground
        // )}
        style={{ position: "relative", flexGrow: 1, backgroundColor: "red" }}
      >
        <SliderPrimitive.Range
          style={{
            position: "absolute",
            height: "100%",
            backgroundColor: "red",
          }}
          //   className={classNames(styles.range, {
          //     [styles.primary]: variant === SliderVariant.Primary,
          //     [styles.secondary]: variant === SliderVariant.Secondary,
          //   })}
        />
      </SliderPrimitive.Track>
      {showThumbs &&
        values.map((...[, index]) => (
          <SliderPrimitive.Thumb
            key={index}
            style={{ display: "block", all: "unset" }}
          />
        ))}
    </SliderPrimitive.Slider>
  );
};
export default memo(Slider);
