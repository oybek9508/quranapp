import { useActor } from "@xstate/react";
import PlayPauseButton from "./Button/PlayPauseButton";

// import useCurrentStationInfo from "src/xstate/Radio/useCurrentStationInfo";

const RadioPlaybackControl = ({ radioActor }) => {
  //   const [radioService] = useActor(radioActor);
  //   const stationInfo = useCurrentStationInfo(radioService.context);
  return (
    <div>
      <div>
        {/* <div>{stationInfo.title}</div>
        <div>{stationInfo.description}</div> */}
      </div>
      <PlayPauseButton />
    </div>
  );
};

export default RadioPlaybackControl;
