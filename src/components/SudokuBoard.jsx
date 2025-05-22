
import React, { useState } from 'react';
import SudokuCell from './SudokuCell';
import NumberPad from './NumberPad';
import { solveSudoku, isValidSudoku, generateEmptySudoku } from '../utils/sudokuLogic';

const SudokuBoard = () => {
  const [board, setBoard] = useState(generateEmptySudoku());
  const [selectedCell, setSelectedCell] = useState(null);
  const [isSolving, setIsSolving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCellClick = (row, col) => {
    setSelectedCell({ row, col });
  };

  const handleNumberSelect = (number) => {
    if (!selectedCell) return;
    
    const newBoard = [...board];
    newBoard[selectedCell.row][selectedCell.col] = number === 0 ? null : number;
    setBoard(newBoard);
  };

  const handleSolveClick = () => {
    if (!isValidSudoku(board)) {
      setErrorMessage('Invalid puzzle! Please check your inputs.');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    setIsSolving(true);
    
    // Delay to show loading state
    setTimeout(() => {
      const boardCopy = board.map(row => [...row]);
      const solved = solveSudoku(boardCopy);
      
      if (solved) {
        setBoard(boardCopy);
        setErrorMessage('');
      } else {
        setErrorMessage('No solution exists for this puzzle!');
        setTimeout(() => setErrorMessage(''), 3000);
      }
      
      setIsSolving(false);
    }, 500);
  };

  const handleClearClick = () => {
    setBoard(generateEmptySudoku());
    setSelectedCell(null);
    setErrorMessage('');
  };

  const handleNewGameClick = () => {
    // For simplicity, we're just clearing the board
    // In a real implementation, this would generate a new valid puzzle
    handleClearClick();
  };

  return (
    <div className="sudoku-container">
      <div className="sudoku-controls">
        <button 
          className="control-button" 
          onClick={handleNewGameClick}
        >
          New Game
        </button>
        <button 
          className="control-button" 
          onClick={handleClearClick}
        >
          Clear
        </button>
        <button 
          className={`control-button solve-button ${isSolving ? 'solving' : ''}`}
          onClick={handleSolveClick}
          disabled={isSolving}
        >
          {isSolving ? 'Solving...' : 'Solve'}
        </button>
      </div>
      
      {errorMessage && (
        <div className="error-message">
          {errorMessage}
        </div>
      )}
      
      <div className="sudoku-board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="sudoku-row">
            {row.map((cell, colIndex) => (
              <SudokuCell
                key={`${rowIndex}-${colIndex}`}
                value={cell}
                isSelected={selectedCell && 
                  selectedCell.row === rowIndex && 
                  selectedCell.col === colIndex}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                row={rowIndex}
                col={colIndex}
              />
            ))}
          </div>
        ))}
      </div>
      
      <NumberPad onNumberSelect={handleNumberSelect} />
    </div>
  );
};

export default SudokuBoard;
