/* eslint-disable react/display-name */
import { Box, Paper } from "@mui/material";
import axios from "axios";
import { useState, useEffect, forwardRef, useRef, useContext } from "react";
import { useSelector } from "@xstate/react";
import dynamic from "next/dynamic";
import { milliSecondsToSeconds } from "src/utils/datetime";
// import AudioPlayer from "react-h5-audio-player";
import { AudioPlayerMachineContext } from "src/xstate/AudioPlayerMachineContext";
import "react-h5-audio-player/lib/styles.css";
import { getChapterAudioData } from "src/api/quran-audio-api";
import { QURANCDN_AUDIO_BASE_URL } from "src/utils/audio";
import AudioPlayerBody from "./AudioPlayerBody";

const AUDIO_DURATION_TOLERANCE = 2; // 2s ,

const getAudioPlayerDownloadProgress = (audioPlayer) => {
  // TODO: Technically this is not accurate, but it's close enough for now.
  /**
   * There can be actually multiple time ranges. For example
   * ------------------------------------------------------
   * |=============|                    |===========|     |
   * ------------------------------------------------------
   * 0             5                    15          19    21
   *
   * But here, we're only taking the latest timestamp
   *
   * Reference: https://developer.mozilla.org/en-US/docs/Web/Guide/Audio_and_video_delivery/buffering_seeking_time_ranges
   */
  if (audioPlayer.buffered && audioPlayer.buffered.length) {
    const lastIndex = audioPlayer.buffered.length - 1;
    const timestamp = audioPlayer.buffered.end(lastIndex);
    return timestamp;
  }
  return 0;
};

const AudioPlayer = forwardRef(({ chapterId }, ref) => {
  const audioPlayerRef = useRef();
  const audioService = useContext(AudioPlayerMachineContext);

  useEffect(() => {
    window.audioPlayerEl = audioPlayerRef.current;
    audioService.send({
      type: "SET_AUDIO_REF",
      audioPlayerRef: audioPlayerRef.current,
    });
  }, [audioService]);

  const isVisible = useSelector(audioService, (state) =>
    state.matches("VISIBLE")
  );

  console.log("isVisible", isVisible);

  const onCanPlay = () => {
    audioService.send({ type: "CAN_PLAY" });
  };

  const onTimeUpdate = (e) => {
    const isLoading = audioService.state.hasTag("loading");
    const audioPlayer = e.target;
    const currentTimestamp = audioPlayer.currentTime;
    const downloadProgress = getAudioPlayerDownloadProgress(audioPlayer);
    const isWaiting =
      currentTimestamp > downloadProgress - AUDIO_DURATION_TOLERANCE;

    const audioDataDuration =
      audioService.getSnapshot().context?.audioData?.duration;
    if (audioDataDuration) {
      const isAlmostEnded =
        currentTimestamp >
        milliSecondsToSeconds(audioDataDuration) - AUDIO_DURATION_TOLERANCE;

      /**
       * simulate onWaiting event on safari.
       * If the audio is not in loading state already. And `currentTime` is nearby last timestamp of `buffered`
       * trigger WAITING event.
       */

      if (!isLoading && isWaiting && !isAlmostEnded) {
        audioService.send({ type: "WAITING" });
      } else if (isLoading && !isWaiting) {
        audioService.send({ type: "CAN_PLAY" });
      }
    }

    audioService.send({ type: "UPDATE_TIMING" });
  };

  const onError = () => {
    audioService.send({
      type: "FAIL",
    });
  };

  const onEnded = () => {
    audioService.send({
      type: "END",
    });
  };

  const onSeeking = () => {
    audioService.send({
      type: "SEEKING",
    });
  };

  const onSeeked = () => {
    audioService.send({
      type: "SEEKED",
    });
  };

  const onPlay = () => {
    audioService.send({ type: "PLAY" });
  };

  const onPause = () => {
    audioService.send({ type: "PAUSE" });
  };

  const onProgress = (e) => {
    audioService.send({
      type: "PROGRESS",
      timestamp: getAudioPlayerDownloadProgress(e.target),
    });
  };

  // const onLoadStart = (event) => {
  //   logEvent("load_audio_file", { audioUrl: event.target.src });
  // };

  return (
    <Paper
      sx={(theme) => ({
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        boxShadow: theme.shadows[24],
        bgcolor: theme.palette.background.paper,
        zIndex: 1,
        height: "100px",
      })}
    >
      {/* <AudioPlayer
        ref={audioPlayerRef}
        id="audio-player"
        style={{ backgroundColor: "inherit" }}
        autoPlay
        layout="horizontal"
        src={`${QURANCDN_AUDIO_BASE_URL}${currentChapterAudio[trackIndex]?.url}`}
        onPlay={(e) => console.log("onPlay")}
        header={`Now playing: ${chapterId}`}
        footer="All music from: www.bensound.com"
        onEnded={handleClickNext}
        showSkipControls={true}
        showJumpControls={true}
        onClickPrevious={handleClickPrevious}
        onClickNext={handleClickNext}
        preload="auto"
        onCanPlay={onCanPlay}
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
        onSeeking={onSeeking}
        onSeeked={onSeeked}
        onError={onError}
        onPlay={onPlay}
        onPause={onPause}
        onProgress={onProgress}
        onLoadStart={onLoadStart}
      /> */}
      <audio
        style={{ display: "none" }}
        id="audio-player"
        ref={audioPlayerRef}
        autoPlay
        preload="auto"
        onCanPlay={onCanPlay}
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
        onSeeking={onSeeking}
        onSeeked={onSeeked}
        onError={onError}
        onPlay={onPlay}
        onPause={onPause}
        onProgress={onProgress}
        // onLoadStart={onLoadStart}
      />
      {isVisible && <AudioPlayerBody />}
    </Paper>
  );
});

export default AudioPlayer;
