import React, { useContext } from "react";

import { useSelector } from "@xstate/react";
import { useRouter } from "next/router";

// import Slider, { Direction, SliderVariant } from '@/dls/Slider';
// import useDirection from '@/hooks/useDirection';
import { AudioPlayerMachineContext } from "src/xstate/AudioPlayerMachineContext";
import { secondsFormatter } from "src/utils/datetime";
import TrackSlider, { SliderVariant } from "../common/Slider";
import { Grid, Typography } from "@mui/material";
import NonLinearSlider from "../common/Slider/Slider";

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
    <Grid
      container
      justifyContent="space-between"
      sx={{
        color: "black",
        minHeight: "30px",
        fontSize: "16px",
        marginBlock: "14px -38px",
      }}
    >
      <Typography type="span" style={{ display: "inline-block" }}>
        {secondsFormatter(elapsed, locale)}
      </Typography>
      <div
        style={{
          display: "inline-block",
          position: "fixed",
          left: 0,
          transform: "translate(0, 0)",
          m: 0,
          width: "100%",
          height: "100px",
        }}
      >
        <TrackSlider
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
      </div>
      <div
        style={{
          display: "inline-block",
          position: "fixed",
          left: 0,
          transform: "translate(0, 0)",
          m: 0,
          width: "100%",
          height: "100px",
        }}
      >
        <TrackSlider
          label="audio-player"
          value={[elapsed]}
          onValueChange={([newTimestamp]) => {
            audioService.send({ type: "SEEK_TO", timestamp: newTimestamp });
          }}
          max={duration}
          direction="ltr"
        />
      </div>
      <span style={{ display: "inline-block" }}>
        {secondsFormatter(duration, locale)}
      </span>
    </Grid>
  );
};

export default AudioPlayerSlider;
