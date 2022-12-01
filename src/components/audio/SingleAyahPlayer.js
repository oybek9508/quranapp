import React from "react";
import ReactAudioPlayer from "react-audio-player";

const SingleAyahPlayer = ({ src }) => {
  return <ReactAudioPlayer src={src} controls />;
};

export default SingleAyahPlayer;
