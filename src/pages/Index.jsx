
import React from 'react';
import SudokuBoard from '../components/SudokuBoard';
import '../styles/SudokuApp.css';

const Index = () => {
  return (
    <div className="sudoku-app">
      <header className="sudoku-header">
        <h1>Sudoku Solver</h1>
      </header>
      <main className="sudoku-main">
        <SudokuBoard />
      </main>
      <footer className="sudoku-footer">
        <p>Fill in the grid and click "Solve" to complete the puzzle</p>
      </footer>
    </div>
  );
};

export default Index;
