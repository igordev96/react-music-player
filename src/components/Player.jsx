import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

function Player({
  songs,
  audioRef,
  currentSong,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
}) {
  //Event Handler
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;

    setSongInfo({ ...songInfo, currentTime: current, duration: duration });
  };

  const getTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    // setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  async function skipTrackHandler(direction) {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      await setCurrentSong(
        songs[currentIndex + 1 === songs.length ? 0 : currentIndex + 1]
      );
      if (isPlaying) audioRef.current.play();
    } else {
      await setCurrentSong(
        songs[currentIndex === 0 ? songs.length - 1 : currentIndex - 1]
      );
      if (isPlaying) audioRef.current.play();
    }
  }

  //State
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });

  //Styling
  const animationPercentage = (songInfo.currentTime / songInfo.duration) * 100;
  const trackAnimation = {
    transform: `translateX(${animationPercentage}%)`,
  };

  const sliderGradient = {
    background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div style={sliderGradient} className="track">
          <input
            value={songInfo.currentTime}
            onChange={dragHandler}
            min={0}
            max={songInfo.duration || 0}
            type="range"
          />
          <div className="animate-track" style={trackAnimation}></div>
        </div>
        <p>{getTime(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-back")}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-forward")}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={() => skipTrackHandler("skip-forward")}
      ></audio>
    </div>
  );
}

export default Player;
