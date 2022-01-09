import LibrarySong from "./LibrarySong";

export default function Library({
  isPlaying,
  audioRef,
  songs,
  setCurrentSong,
  currentSong,
  libraryStatus,
}) {
  return (
    <div className={`library ${libraryStatus ? "active-library" : ""}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong
            isPlaying={isPlaying}
            audioRef={audioRef}
            currentSong={currentSong}
            setCurrentSong={setCurrentSong}
            song={song}
            key={song.id}
          />
        ))}
      </div>
    </div>
  );
}
