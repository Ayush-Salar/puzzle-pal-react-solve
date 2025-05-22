
// Generate an empty 9x9 Sudoku board
export const generateEmptySudoku = () => {
  return Array(9).fill().map(() => Array(9).fill(null));
};

// Check if a number placement is valid in the Sudoku grid
const isValid = (board, row, col, num) => {
  // Check row
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num) {
      return false;
    }
  }

  // Check column
  for (let y = 0; y < 9; y++) {
    if (board[y][col] === num) {
      return false;
    }
  }

  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  
  for (let y = boxRow; y < boxRow + 3; y++) {
    for (let x = boxCol; x < boxCol + 3; x++) {
      if (board[y][x] === num) {
        return false;
      }
    }
  }

  return true;
};

// Solve the Sudoku puzzle using backtracking
export const solveSudoku = (board) => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      // Find an empty cell
      if (board[row][col] === null) {
        // Try placing numbers 1-9
        for (let num = 1; num <= 9; num++) {
          if (isValid(board, row, col, num)) {
            // Place the number
            board[row][col] = num;
            
            // Recursively try to solve the rest
            if (solveSudoku(board)) {
              return true;
            }
            
            // If placing this number doesn't lead to a solution, backtrack
            board[row][col] = null;
          }
        }
        // No valid number found for this cell
        return false;
      }
    }
  }
  // All cells filled
  return true;
};

// Check if the current board state is valid
export const isValidSudoku = (board) => {
  // Check if there are any conflicting numbers
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const currentValue = board[row][col];
      
      if (currentValue !== null) {
        // Temporarily remove the value to check if it's valid
        board[row][col] = null;
        const isValidPlacement = isValid(board, row, col, currentValue);
        board[row][col] = currentValue;
        
        if (!isValidPlacement) {
          return false;
        }
      }
    }
  }
  
  return true;
};
