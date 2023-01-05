import { Grid } from "@mui/material";
import { useActor } from "@xstate/react";
import PlayPauseButton from "./Button/PlayPauseButton";

// import useCurrentStationInfo from "src/xstate/Radio/useCurrentStationInfo";

const RadioPlaybackControl = ({ radioActor }) => {
  //   const [radioService] = useActor(radioActor);
  //   const stationInfo = useCurrentStationInfo(radioService.context);
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      sx={{ height: "100%", maxWidth: "100%" }}
    >
      <div>
        {/* <div>{stationInfo.title}</div>
        <div>{stationInfo.description}</div> */}
      </div>
      <PlayPauseButton />
    </Grid>
  );
};

export default RadioPlaybackControl;
