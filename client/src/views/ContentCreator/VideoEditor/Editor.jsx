import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import PauseBreaks from './PauseBreaks';
import TextBox from './TextBox';

const VideoEditor = ({ videoLink }) => {
    // const [playerBounds, setPlayerBounds] = useState({ width: 0, height: 0 });
    const [pauseBreaks, setPauseBreaks] = useState([]);
    const [isVideoPaused, setIsVideoPaused] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const playerRef = useRef();
  
    const handleProgress = (state) => {
      setCurrentTime(state.playedSeconds);
    };
  
    const handleAddPauseBreak = (time) => {
      setPauseBreaks([...pauseBreaks, time]);
    };
  
    const handleRemovePauseBreak = (time) => {
      setPauseBreaks(pauseBreaks.filter((pb) => pb !== time));
    };
  
    const handleInteractionSubmit = (pauseBreakTime, interactionText) => {
        // Implement the logic for what happens when text is submitted
        console.log(`Text at time ${pauseBreakTime}: ${interactionText}`);
    };

    useEffect(() => {
      const nearPauseBreak = pauseBreaks.find((pauseBreak) => Math.abs(currentTime - pauseBreak) < 0.5);
      if (nearPauseBreak !== undefined && !isVideoPaused) {
        setIsVideoPaused(true);
      }
    }, [currentTime, pauseBreaks, isVideoPaused]);
  
    return (
      <div className="video-editor">
        <ReactPlayer
          ref={playerRef}
          url={videoLink}
          controls
          onProgress={handleProgress}
          playing={!isVideoPaused}
          onPlay={() => setIsVideoPaused(false)}
          onPause={() => setIsVideoPaused(true)}
          onError={() => console.error('Error playing video')}
        />
  
        <PauseBreaks
          pauseBreaks={pauseBreaks}
          onAddPauseBreak={handleAddPauseBreak}
          onRemovePauseBreak={handleRemovePauseBreak}
          playerRef={playerRef}
          isVideoPaused={isVideoPaused}
        />
        
        <TextBox
            pauseBreaks={pauseBreaks}
            isVideoPaused={isVideoPaused}
            currentTime={currentTime}
            onInteractionSubmit={handleInteractionSubmit}
        />

      </div>
    );
  };
  
  export default VideoEditor;