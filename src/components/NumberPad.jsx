
import React from 'react';

const NumberPad = ({ onNumberSelect }) => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  
  return (
    <div className="number-pad">
      {numbers.map(number => (
        <button 
          key={number} 
          className="number-button"
          onClick={() => onNumberSelect(number)}
        >
          {number}
        </button>
      ))}
      <button 
        className="number-button erase-button"
        onClick={() => onNumberSelect(0)}
      >
        Erase
      </button>
    </div>
  );
};

export default NumberPad;
