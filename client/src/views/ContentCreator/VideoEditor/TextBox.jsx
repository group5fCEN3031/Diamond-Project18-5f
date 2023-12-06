import React, { useState, useEffect } from 'react';
import "./TextBox.less";

const TextBox = ({ pauseBreaks, isVideoPaused, currentTime, onInteractionSubmit }) => {
  const [text, setText] = useState('');
  const [showTextBox, setShowTextBox] = useState(false);

  const handleChange = (event) => {
    event.stopPropagation(); // Prevent event from propagating up to parent elements
    setText(event.target.value);
  };

  const handleButtonClick = (event) => {
    event.stopPropagation();
    event.preventDefault(); // Prevent any default behavior
    setShowTextBox(!showTextBox); // Toggle visibility of text box
  };

  const handleSubmit = (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (isVideoPaused && pauseBreaks.includes(currentTime)) {
      onInteractionSubmit(currentTime, text); // Use current time for submission
      setText('');
      setShowTextBox(false); // Hide text box after submitting
    }
  };

  useEffect(() => {
    // Automatically hide the text box if the video is not paused or not near a pause break
    if (!isVideoPaused || !pauseBreaks.includes(currentTime)) {
      setShowTextBox(false);
    }
  }, [isVideoPaused, currentTime, pauseBreaks]);

  return (
    <div>
      <button onClick={handleButtonClick} id = "add-textbox-btn">
        {showTextBox ? '- Remove Text Box' : '+ Add a Text Box'}
      </button>

      {showTextBox && (
        <div>
          <textarea
            id = "text-entry-textbox"
            value={text}
            onChange={handleChange}
            placeholder="Enter text here..."
          />
          <button onClick={handleSubmit} id = "submit-textbox-btn">
            Submit Text
            </button>
        </div>
      )}
    </div>
  );
};

export default TextBox;
