import React, { useState, useRef, useEffect} from 'react';
import ReactPlayer from 'react-player';

const MP3Player = ({ url }) => {

    const [playing, setPlaying] = useState(true);
    const playerRef = useRef(null);
    
    
    const togglePlayback = () => {
        setPlaying(!playing);
      };

    const handleEnded = () => {
        playerRef.current.seekTo(0);
        setPlaying(true);
    };

    useEffect(() => {
        setPlaying(true);
    }, []);

    return (
        <div class = "oceanPlayer">
            <ReactPlayer ref={playerRef} url={url} playing={playing} controls={false} onEnded={handleEnded} />
            <img
            src={playing ? "/equalizer.gif" : "/pause.png"} 
            alt={playing ? 'Play' : 'Pause'}
            className={playing ? 'play' : 'pause'}
            onClick={togglePlayback}
            />
        </div>
    );
};

export default MP3Player;

