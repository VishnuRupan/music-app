
import React from 'react';
import LibrarySong from './LibrarySong'


const Library = ({songs, setCurrentSong, setSongs, libraryStatus, currentSong}) => {

    return(
        <div className={`library ${libraryStatus ? 'active-library' : ""}`}>
            <h2>Library</h2>
            <div className="library-songs">

                {songs.map(song => (
                    <LibrarySong currentSong={currentSong} setSongs={setSongs} songs={songs} id={song.id} key={song.id} setCurrentSong={setCurrentSong} song={song} />
                ))}

            </div>
        </div>
    )

}


export default Library;