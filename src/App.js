import React, {useState} from "react";
import "./styles/app.scss"
import Song from "./components/Song"
import Player from "./components/Player"
import chillHop from "./data";
import Library from './components/Library'
import Nav from './components/Nav'

function App() {

  //state calls function that returns an array of objects
  // songs holds the array
  const[songs, setSongs] = useState(chillHop());
  const[currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const[libraryStatus, setLibraryStatus] = useState(false);


  return (
    <div className={`App ${libraryStatus ? 'library-active' : ""}`}>
      <Nav setLibraryStatus={setLibraryStatus} libraryStatus={libraryStatus} />
      <Song currentSong={currentSong}  isPlaying={isPlaying}/>
      <Player currentSong={currentSong} 
              setCurrentSong={setCurrentSong}
              songs={songs}
              isPlaying={isPlaying} 
              setIsPlaying={setIsPlaying}/>

      <Library currentSong={currentSong} libraryStatus={libraryStatus} songs={songs} setCurrentSong={setCurrentSong} setSongs={setSongs}/>
    </div>
  );
}

export default App;
