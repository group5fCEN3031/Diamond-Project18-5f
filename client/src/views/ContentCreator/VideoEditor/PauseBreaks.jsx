import React from 'react';

const PauseBreaks = ({ pauseBreaks, onAddPauseBreak, onRemovePauseBreak, isVideoPaused, currentTime }) => {

  const handleAddPauseBreak = () => {
    // Check if the video is paused before adding a pause break
    if (isVideoPaused && currentTime != null) {
      onAddPauseBreak(currentTime);
    } else {
      alert('Pause the video where you want to add a pause break.');
    }
  };

  return (
    <div>
      <button onClick={handleAddPauseBreak} disabled={!isVideoPaused}>
        Pause-Break
      </button>
      <ul>
        {pauseBreaks.map((pauseBreak, index) => (
          <li key={index}>
        
            <button onClick={() => onRemovePauseBreak(pauseBreak)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PauseBreaks;
