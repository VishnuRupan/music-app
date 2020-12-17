

const LibrarySong = ({song, songs, setCurrentSong, id, setSongs, currentSong}) => {

    const songSelectHandler = () => {
        const selectedSong = songs.filter((state) => state.id === id )
        setCurrentSong(selectedSong[0]);

        //add active state 
        const newSongs = songs.map((song) => {

            return {
                ...song, 
                active: song.id === id
            }
        })

        setSongs(newSongs);
    }


    return (
        <div className={`library-song ${song.id === currentSong.id ? "selected" : ""}`} 
            onClick={songSelectHandler}>
            <img className="library-song-img" src={song.cover} alt={song.name}/>

            <div className="song-description">
                <h3 className="library-song-h3" > {song.name}</h3>
                <h4 className="library-song-h4" > {song.artist}</h4>
            </div>

        </div>
    )
}

export default LibrarySong;