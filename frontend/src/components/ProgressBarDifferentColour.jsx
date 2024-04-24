import React from 'react';
import "../styles/styles.css"; 

const ProgressBarDifferentColour = ({ currentValue, maxValue }) => {
  const percentage = (currentValue / maxValue) * 100;

  return (
    <progress
      className="progress-bar" 
      value={percentage}
      max="100"
    >
      {currentValue}%
    </progress>
  );
};

export default ProgressBarDifferentColour;
