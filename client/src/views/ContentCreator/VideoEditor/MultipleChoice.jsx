import React, { useState, useEffect } from 'react';

const MultipleChoiceInput = ({ pauseBreakTime, onInteractionSubmit, isVideoPaused, currentTime }) => {
  const [options, setOptions] = useState(['', '', '', '']); // Assuming 4 options for simplicity
  const [correctIndex, setCorrectIndex] = useState(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Activate the MultipleChoiceInput when the video reaches the pause break time and is paused
    if (isVideoPaused && currentTime === pauseBreakTime) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [isVideoPaused, currentTime, pauseBreakTime]);

  const handleOptionChange = (text, index) => {
    const updatedOptions = [...options];
    updatedOptions[index] = text;
    setOptions(updatedOptions);
  };

  const handleSubmit = () => {
    if (correctIndex === null) {
      alert('select correct answer');
      return;
    }
    onInteractionSubmit(pauseBreakTime, { options, correctIndex });
    setOptions(['', '', '', '']);
    
    setCorrectIndex(null); // Reset the form after submission
  };

  if (!isActive) {
    return null;
  }

  return (
    <div>
      {options.map((option, index) => (
        <div key={index}>
          <input
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(e.target.value, index)}
            placeholder={`Option ${index + 1}`}
          />
          <input
            type="radio"
            name="correctOption"
            checked={correctIndex === index}
            onChange={() => setCorrectIndex(index)}
          /> Correct
        </div>
      ))}
      <button 
        onClick={handleSubmit} 
        disabled={options.some(option => !option) || correctIndex === null} // Disable if any option is empty or no correct option is selected
        className="submit-button" // Add a class for styling
      >
        Submit Options
      </button>
    </div>
  );
};

export default MultipleChoiceInput;
