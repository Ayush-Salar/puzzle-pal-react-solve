
import React from 'react';

const SudokuCell = ({ value, isSelected, onClick, row, col }) => {
  // Determine if cell is in a highlighted box or line
  const isHighlightedBox = Math.floor(row / 3) % 2 === Math.floor(col / 3) % 2;
  const cellClasses = [
    'sudoku-cell',
    isSelected ? 'selected' : '',
    isHighlightedBox ? 'alternate-box' : '',
    (row === 2 || row === 5) ? 'border-bottom' : '',
    (col === 2 || col === 5) ? 'border-right' : ''
  ].join(' ');

  return (
    <div className={cellClasses} onClick={onClick}>
      {value || ''}
    </div>
  );
};

export default SudokuCell;
