import { useContext } from "react";
import { AudioContext } from "../../context/AudioContext";
import style from "./track.module.scss";
import { IconButton } from "@mui/material";
import { PlayArrow, PauseCircle } from "@mui/icons-material";

import secondsToMMSS from "../../utils/secondsToMMSS";
import cn from "classnames";

const Track = (track) => {
  const { id, src, preview, duration, title, artists } = track;

  const { handleToggleAudio, currentTrack, isPlaying } =
    useContext(AudioContext);

  const isCurrentTrack = currentTrack.id === track.id;
  // const isPlaying = playingTrack.id === track.id;

  const formatedDuration = secondsToMMSS(duration);

  return (
    <div className={cn(style.track, isCurrentTrack && style.playing)}>
      <IconButton onClick={() => handleToggleAudio(track)}>
        {isCurrentTrack && isPlaying ? <PauseCircle /> : <PlayArrow />}
      </IconButton>
      <img className={style.preview} src={preview} alt="" />
      <div className={style.credits}>
        <b>{title}</b>
        <p>{artists}</p>
      </div>
      <p>{formatedDuration}</p>
    </div>
  );
};

export default Track;
