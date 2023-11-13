import React, { useState, useEffect } from 'react';

const TextInput = ({ pauseBreakTime, onInteractionSubmit, isVideoPaused, currentTime }) => {
  const [interactionText, setInteractionText] = useState('');
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Activate the TextInput when the video reaches the pause break time and is paused
    if (isVideoPaused && currentTime === pauseBreakTime) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [isVideoPaused, currentTime, pauseBreakTime]);

  const handleSubmit = () => {
    onInteractionSubmit(pauseBreakTime, interactionText);
    setInteractionText(''); // Reset text input after submission
  };

  if (!isActive) {
    return null;
  }

  return (
    <div>
      <textarea
        value={interactionText}
        onChange={(e) => setInteractionText(e.target.value)}
        placeholder="Enter your text here..."
      />
      <button onClick={handleSubmit}>Submit Text</button>
    </div>
  );
};

export default TextInput;
