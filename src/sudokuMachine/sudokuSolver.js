import { getNewSudokuBoard, getSolutionOfSudokuBoard } from './sudokuApi';

export const getNewBoardAndSolve = () => {
  return getNewSudokuBoard()
    .then((board) => {
      return getSolutionOfSudokuBoard(board).then((solution) => {
        return solve(board, solution, JSON.parse(JSON.stringify(board)));
      });
    })
    .then((all) => {
      console.log(all);
      return all;
    })
    .catch(function(error) {
      console.log(error);
    });
};

export const solve = (board, solution, ogBoard) => {
  const changesArray = [];
  const done = canSolveSudokuFromCell(board, 0, 0, changesArray);
  const isSolutionCorrect = equal(done.board, solution);
  return {
    isSolved: done.isSolved,
    solution: solution,
    board: done.board,
    changesArraySolved: done.changesArraySolved,
    isSolutionCorrect: isSolutionCorrect,
    ogBoard: ogBoard
  };
};

const canPlaceValue = (board, rowToPlace, colToPlace, numToPlace) => {
  //Check if the number is possible to put in the COLUMN OF columnToPlace
  let rowError = 0;
  for (const row of board) {
    if (row[colToPlace] === numToPlace) {
      let message =
        'caught column conflict at [' +
        rowError +
        '][' +
        colToPlace +
        '] with :' +
        row[colToPlace];
      message.toString();
      return false;
    }
    rowError = rowError + 1;
  }

  //Check if the number is possible to put in the ROW OF rowToPlace
  for (let i = 0; i < board[rowToPlace].length; i++) {
    if (numToPlace === board[rowToPlace][i]) {
      let message =
        'caught ROW conflict with : [' +
        rowToPlace +
        '][' +
        i +
        '] with: ' +
        board[rowToPlace][i];
      message.toString();
      return false;
    }
  }

  //Check if the number is possible to place in the sub-box
  let boxRows = Math.floor(rowToPlace / 3) * 3;
  let boxCols = Math.floor(colToPlace / 3) * 3;

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (board[boxRows + r][boxCols + c] === numToPlace) {
        let message =
          'caught box conflict at : [' +
          (boxRows + r) +
          '][' +
          (boxCols + c) +
          '] with value : ' +
          board[boxRows + r][boxCols + c];
        message.toString();
        return false;
      }
    }
  }

  return true;
};

const canSolveSudokuFromCell = (
  board,
  rowToPlace,
  colToPlace,
  changesArray
) => {
  let row = rowToPlace;
  let col = colToPlace;

  if (col === board[row].length) {
    col = 0;
    row = row + 1;

    if (row === board.length) {
      return {
        isSolved: true,
        board: board,
        changesArraySolved: changesArray
      };
    }
  }

  // Skip entries already filled out. They already have a value in them.
  if (board[row][col] !== 0) {
    return canSolveSudokuFromCell(board, row, col + 1, changesArray);
  }

  for (let value = 1; value <= board.length; value++) {
    const numToPlace = value;
    if (canPlaceValue(board, row, col, numToPlace)) {
      board[row][col] = numToPlace;
      let changeObject = { row: row, col: col, numToPlace: numToPlace };
      changesArray.push(changeObject);
      if (canSolveSudokuFromCell(board, row, col + 1, changesArray).isSolved) {
        return {
          isSolved: true,
          board: board,
          changesArraySolved: changesArray
        };
      }
      board[row][col] = 0;
    }
  }

  return {
    isSolved: false,
    board: board,
    changesArraySolved: changesArray
  };
};

const equal = (array1, array2) => {
  return JSON.stringify(array1) === JSON.stringify(array2);
};
