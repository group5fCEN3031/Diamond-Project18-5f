import React from 'react';
import "./PauseBreaks.less";

const PauseBreaks = ({ pauseBreaks, onAddPauseBreak, onRemovePauseBreak, isVideoPaused, playerRef }) => {
  const handleAddPauseBreak = (event) => {
    event.stopPropagation();
    event.preventDefault();
    try {
      if (isVideoPaused && playerRef && playerRef.current) {
        const exactTime = playerRef.current.getCurrentTime();
        onAddPauseBreak(exactTime);
        console.log('Pause-break added at time:', exactTime);
      } else {
        console.warn('Video is not paused or playerRef is not available');
      }
    } catch (error) {
      console.error('Error in handleAddPauseBreak:', error);
    }
  };

  return (
    <div>
      <button onClick={handleAddPauseBreak} id = "add-pause-btn">
        + Add a Pause-Break
      </button>
      <ul>
        {pauseBreaks.map((pauseBreak, index) => (
          <li key={index}>
            <button onClick={() => onRemovePauseBreak(pauseBreak)}  id = "rem-pause-btn">
              - Remove Pause-Break
              </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PauseBreaks;