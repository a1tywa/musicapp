import { useContext, useState, useEffect } from "react";
import { AudioContext } from "../../context/AudioContext";
import style from "./playbar.module.scss";
import { Slider, IconButton } from "@mui/material";
import { PauseCircle, PlayArrow } from "@mui/icons-material";
import secondsToMMSS from "../../utils/secondsToMMSS";

const TimeControl = () => {
  const { audio, currentTrack } = useContext(AudioContext);
  const { duration } = currentTrack;

  const [currentTime, setCurrentTime] = useState(0);
  const formatedCurrentTime = secondsToMMSS(currentTime);
  const sliderCurrentTime = Math.round((currentTime / duration) * 100);
  const handleChangeCurrentTime = (_, value) => {
    const time = (value / 100) * duration;
    setCurrentTime(time);
    audio.currentTime = time;
  };
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(audio.currentTime);
    }, 1000);
    return () => {
      clearInterval(timeInterval);
    };
  }, []);

  return (
    <>
      <p>{formatedCurrentTime}</p>
      <Slider
        step={1}
        min={0}
        max={100}
        value={sliderCurrentTime}
        onChange={handleChangeCurrentTime}
      />
    </>
  );
};

const Playbar = () => {
  const { audio, currentTrack, handleChangeCurrentTime, isPlaying } =
    useContext(AudioContext);
  const { title, artists, preview, duration } = currentTrack;

  const formatedDuration = secondsToMMSS(duration);

  return (
    <div className={style.playbar}>
      <img className={style.preview} src={preview} alt="" />
      <IconButton onClick={() => handleToggleAudio(currentTrack)}>
        {isPlaying ? <PauseCircle /> : <PlayArrow />}
      </IconButton>
      <div className={style.credits}>
        <h4>{title}</h4>
        <p>{artists}</p>
      </div>
      <div className={style.slider}></div>
      <TimeControl />

      <p>{formatedDuration}</p>
    </div>
  );
};

export default Playbar;
