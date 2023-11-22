import { useState } from "react";
import trackList from "../../assets/trackList";
import style from "./mainPage.module.scss";
import Track from "../../components/Track/Track";
import { Input } from "@mui/material";

const runSearch = (query) => {
  if (!query) {
    return trackList;
  }

  const lowerCaseQuery = query.toLowerCase();

  return trackList.filter(
    (track) =>
      track.title.toLowerCase().includes(lowerCaseQuery) ||
      track.artists.toLowerCase().includes(lowerCaseQuery)
  );
};

const MainPage = () => {
  const [tracks, setTracks] = useState(trackList);

  const handleChange = (event) => {
    const foundTracks = runSearch(event.target.value);
    setTracks(foundTracks);
  };

  return (
    <div className={style.seach}>
      <Input
        className={style.input}
        placeholder="Поиск треков"
        onChange={handleChange}
      />
      <div className={style.list}>
        {tracks.map((track) => (
          <Track key={track.id} {...track} />
        ))}
      </div>
    </div>
  );
};

export default MainPage;
