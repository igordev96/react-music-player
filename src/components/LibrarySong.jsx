export default function LibrarySong({
  currentSong,
  isPlaying,
  audioRef,
  song,
  setCurrentSong,
}) {
  async function songSelectHandler() {
    await setCurrentSong(song);
    //check if the song is playing
    if (isPlaying) audioRef.current.play();
  }

  return (
    <div
      onClick={songSelectHandler}
      className={`library-song ${song.id === currentSong.id ? "selected" : ""}`}
    >
      <img alt="Album Cover" src={song.cover} />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
}
