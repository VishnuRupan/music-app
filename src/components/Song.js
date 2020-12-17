

const Song = ({currentSong, isPlaying}) => {




    return (
        <div className="song-container">
            <img  className={`song-img ${ isPlaying ? 'rotating' : ""}`} src={currentSong.cover} alt={currentSong.name}/>
            <h2 className="song-h2" > {currentSong.name}</h2>
            <h3 className="song-h3" > {currentSong.artist}</h3>
        </div>
    )
}

export default Song;