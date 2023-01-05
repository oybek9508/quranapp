import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider, {
  SliderThumb,
  SliderTrack,
  SliderRail,
} from "@mui/material/Slider";

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

// function valueLabelFormat(value) {
//   const units = ["KB", "MB", "GB", "TB"];

//   let unitIndex = 0;
//   let scaledValue = value;

//   while (scaledValue >= 1024 && unitIndex < units.length - 1) {
//     unitIndex += 1;
//     scaledValue /= 1024;
//   }

//   return `${scaledValue} ${units[unitIndex]}`;
// }

// function calculateValue(value) {
//   return 2 ** value;
// }

export default function NonLinearSlider({
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
}) {
  const values = value || defaultValue;
  //   const [value, setValue] = React.useState(10);

  //   const handleChange = (event, newValue) => {
  //     if (typeof newValue === "number") {
  //       setValue(newValue);
  //     }
  //   };

  return (
    <Box sx={{ width: "100%" }}>
      {/* <Typography id="non-linear-slider" gutterBottom>
        Storage: {valueLabelFormat(calculateValue(value))}
      </Typography> */}
      <Slider
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        dir={direction}
        orientation={orientation}
        minStepsBetweenThumbs={minStepsBetweenThumbs}
        {...(defaultValue && { defaultValue })}
        {...(value && { value })}
        // {...(onValueChange && { onValueChange })}
        onChange={onValueChange}
        {...(name && { name })}
        aria-label={label}
        // scale={calculateValue}
        // getAriaValueText={valueLabelFormat}
        // valueLabelFormat={valueLabelFormat}
        // onChange={handleChange}
        // valueLabelDisplay="auto"
        // aria-label={label}
      >
        <SliderTrack>
          <SliderRail
            style={{
              position: "absolute",
              height: "100%",
              backgroundColor: "red",
            }}
          />
        </SliderTrack>
        {showThumbs &&
          values.map((...[, index]) => (
            <SliderThumb
              key={index}
              style={{
                display: "block",
                all: "unset",
                width: "10px",
                height: "10px",
                backgroundColor: "red",
                borderRadius: "50%",
              }}
            />
          ))}
      </Slider>
    </Box>
  );
}
