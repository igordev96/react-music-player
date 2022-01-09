const Song = ({ isPlaying, currentSong }) => {
  const imgAnimation = {
    animationPlayState: `${isPlaying ? "running" : "paused"}`,
  };
  return (
    <div className="song-container">
      <img style={imgAnimation} alt="Album Cover" src={currentSong.cover} />
      <h2>{currentSong.name}</h2>
      <h3>{currentSong.artist}</h3>
    </div>
  );
};

export default Song;
