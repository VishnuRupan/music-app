
import React, {useRef, useState} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlay, faAngleLeft, faAngleRight, faPause } from "@fortawesome/free-solid-svg-icons"

const Player = ({currentSong, isPlaying, setIsPlaying, songs, setCurrentSong}) => {

    //react way instead of queryselector
    const audioRef = useRef(null);

    //event handlers
    const playSongHandler = () => { 
        // audioRef.current.play(); 
        if ( isPlaying ) audioRef.current.pause();
        else  audioRef.current.play(); 
        setIsPlaying(!isPlaying);
    }

    // useEffect(() => {
    //     if (isPlaying && audioRef.current.paused) {
    //         audioRef.current.play()
    //     }
    // }, [isPlaying, currentSong])

    // useEffect(() => {
    //    //active state
    // const newSongs = songs.map((song) => {
    //     if(song.id === currentSong.id) {
    //       return {
    //         ...song, 
    //         active: true,
    //       };
    //     } else {
    //       return {
    //         ...song,
    //         active: false,
    //       };
    //     }
    //   });
    //   setSongs(newSongs);

    // }, [currentSong])


    const autoPlayHandler = () => {
        if(isPlaying) {
            audioRef.current.play();
        }
    }
    


    const timeUpdateHandler = (e) => {
        const current = e.target.currentTime;
        const duration = e.target.duration;    
        setSongInfo({...songInfo, currentTime:current, duration});
    }

    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
    });

    const animationPercentage = (songInfo.currentTime / songInfo.duration) * 100;


    const getTime = (time) => {
        return Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);
    }

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo, currentTime: e.target.value})
    }



    const skipTrackHandler = (direction) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);


        if(direction === 1) {
            setCurrentSong(songs[ (currentIndex+1) % songs.length]);
        } else {
            if (((currentIndex-1) % songs.length ) === -1 ) {
                setCurrentSong(songs[songs.length - 1]);
                return;
            }
            setCurrentSong(songs[ (currentIndex-1) % songs.length]);
        }


    }





    /////////

    return (
        <div className="player">
            <div className="time-control">
                <p className="time-control-p"> {getTime(songInfo.currentTime)} </p>

               <div className="track" style={{background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`}} >
                <input onChange={dragHandler} type="range" min={0} max={songInfo.duration || 0} value={songInfo.currentTime} className="time-control-input"/>
                <div className="animate-track" 
                    style={{transform: `translateX(${animationPercentage}%)`}}> 
                </div>
               </div>
               
                <p className="time-control-p">{getTime(songInfo.duration || 0)}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon onClick={()=> skipTrackHandler(-1)} className="skip-back" size="2x" icon={faAngleLeft}/>
                <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={ isPlaying ? faPause : faPlay}/>
                <FontAwesomeIcon onClick={()=> skipTrackHandler(1)} className="skip-forward" size="2x" icon={faAngleRight}/>
            </div>

            <audio 
                onLoadedData={autoPlayHandler}
                onEnded={()=> skipTrackHandler(1)}
                onLoadedMetadata={timeUpdateHandler}
                onTimeUpdate={timeUpdateHandler} 
                ref={audioRef} src={currentSong.audio}></audio>
        </div>
    )
}

export default Player;