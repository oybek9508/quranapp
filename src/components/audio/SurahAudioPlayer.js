/* eslint-disable react/display-name */
import { Paper } from "@mui/material";
import { useState, useEffect, forwardRef } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { getChapterAudioData } from "src/api/quran-audio-api";

const SurahAudioPlayer = forwardRef(({ chapterId }, ref) => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentChapterAudio, setCurrentChapterAudio] = useState(null);
  useEffect(() => {
    const handleChapterPlay = async () => {
      const audioData = await getChapterAudioData(7, Number(chapterId));
      setCurrentChapterAudio(audioData);
    };
    handleChapterPlay();
  }, [chapterId]);

  console.log("currentChapterAudio", currentChapterAudio);

  const handleClickPrevious = () => {
    setTrackIndex((currentTrack) =>
      currentTrack === 0 ? musicTracks.length - 1 : currentTrack - 1
    );
  };

  const handleClickNext = () => {
    setTrackIndex((currentTrack) =>
      currentTrack < musicTracks.length - 1 ? currentTrack + 1 : 0
    );
  };
  return (
    <Paper
      sx={(theme) => ({
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        boxShadow: theme.shadows[24],
        bgcolor: theme.palette.background.paper,
      })}
    >
      <AudioPlayer
        ref={ref}
        style={{ backgroundColor: "inherit" }}
        // style={{ borderRadius: "1rem" }}
        autoPlay
        // layout="horizontal"
        src="https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/1.mp3"
        onPlay={(e) => console.log("onPlay")}
        showSkipControls={true}
        showJumpControls={false}
        // header={`Now playing: ${chapterId}`}
        // footer="All music from: www.bensound.com"
        onClickPrevious={handleClickPrevious}
        onClickNext={handleClickNext}
        onEnded={handleClickNext}
        // other props here
      />
    </Paper>
  );
});

export default SurahAudioPlayer;
