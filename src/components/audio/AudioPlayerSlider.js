import React, { useContext } from "react";

import { useSelector } from "@xstate/react";
import { useRouter } from "next/router";

// import Slider, { Direction, SliderVariant } from '@/dls/Slider';
// import useDirection from '@/hooks/useDirection';
import { AudioPlayerMachineContext } from "src/xstate/AudioPlayerMachineContext";
import { secondsFormatter } from "src/utils/datetime";
import Slider, { SliderVariant } from "../common/Slider";
import { Grid } from "@mui/material";

const AudioPlayerSlider = () => {
  const router = useRouter();
  const { locale } = router;
  //   const direction = useDirection();

  const audioService = useContext(AudioPlayerMachineContext);
  const elapsed = useSelector(audioService, (state) => state.context.elapsed);
  const downloadProgress = useSelector(
    audioService,
    (state) => state.context.downloadProgress
  );
  const duration = useSelector(audioService, (state) => state.context.duration);
  return (
    <Grid container justifyContent="space-between">
      <span style={{ display: "inline-block" }}>
        {secondsFormatter(elapsed, "en")}
      </span>
      <Grid
        sx={{
          display: "inline-block",
          position: "fixed",
          left: "50%",
          transform: "translate(50%, 0)",
          m: 0,
          width: "100%",
          height: "100px",
        }}
      >
        <Slider
          showThumbs={false}
          variant="red"
          label="audio-player"
          value={[downloadProgress]}
          onValueChange={([newTimestamp]) => {
            audioService.send({ type: "SEEK_TO", timestamp: newTimestamp });
          }}
          max={duration}
          direction="ltr"
          withBackground
        />
        `{" "}
      </Grid>
      `
      <Grid
        sx={{
          display: "inline-block",
          position: "fixed",
          left: "50%",
          transform: "translate(50%, 0)",
          m: 0,
          width: "100%",
          height: "100px",
        }}
      >
        <Slider
          label="audio-player"
          value={[elapsed]}
          onValueChange={([newTimestamp]) => {
            audioService.send({ type: "SEEK_TO", timestamp: newTimestamp });
          }}
          max={duration}
          direction="ltr"
        />
      </Grid>
      <span>{secondsFormatter(duration, "en")}</span>
    </Grid>
  );
};

export default AudioPlayerSlider;
