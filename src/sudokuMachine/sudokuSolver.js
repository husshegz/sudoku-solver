import {
  getNewSudokuBoardPromise,
  getSolutionOfSudokuBoardPromise,
  getNewSudokuBoard,
  getSolutionOfSudokuBoard
} from './sudokuApi';

/**
 * Promise Function
 * 1) get a new board from the sugoku API : GET-REQUEST
 * 2) get the solution of the of newly generated board : POST-REQUEST
 * 3) keeps a copy of the original board : DEEP-CLONE
 */
export const getNewBoardAndSolvePromise = () => {
  return getNewSudokuBoardPromise()
    .then((board) => {
      return getSolutionOfSudokuBoardPromise(board).then((solution) => {
        return solve(board, solution, JSON.parse(JSON.stringify(board)));
      });
    })
    .then((all) => {
      //console.log(all);
      return all;
    })
    .catch(function(error) {
      console.log(error);
    });
};

/**
 * ASYNC Function
 * 1) get a new board from the sugoku API : GET-REQUEST
 * 2) get the solution of the of newly generated board : POST-REQUEST
 * 3) keeps a copy of the original board : DEEP-CLONE
 * Note: Similar to the Promise function but Async
 */
export const getNewBoardAndSolveAsync = async () => {
  let board = await getNewSudokuBoard();
  let ogBoard = JSON.parse(JSON.stringify(board));
  let solution = await getSolutionOfSudokuBoard(board);
  let result = solve(board, solution, ogBoard);
  return result;
};

/**
 * Where the backtracking algorithm is called
 * 1) Solves given board
 * 2) Populates an array with the detailed steps
 * that the backtracking algorithm took
 * 3) Checks if the backtracking algorithm solution worked
 * & its solution is correct
 */
export const solve = (board, solution, ogBoard) => {
  const backtrackingChangesSteps = [];
  const backTrackingResult = canSolveSudokuFromCell(
    board,
    0,
    0,
    backtrackingChangesSteps
  );
  const isBackTrackingSolutionCorrect = equal(
    backTrackingResult.board,
    solution
  );
  return {
    isBackTrackingSuccess: backTrackingResult.isBackTrackingSuccess,
    solution: solution,
    board: backTrackingResult.board,
    backtrackingChangesSteps: backTrackingResult.backtrackingChangesSteps,
    isBackTrackingSolutionCorrect: isBackTrackingSolutionCorrect,
    ogBoard: ogBoard
  };
};

/**
 * Takes indexes and a value to place
 * Checks if the value would conflict with the rules of sudoku
 * Basically, if the given number is a safe option for the chosen cell
 */
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

/**
 * Where the magic (recursion) happens
 * Solves the sudoku board
 */
const canSolveSudokuFromCell = (
  board,
  rowToPlace,
  colToPlace,
  backtrackingChangesSteps
) => {
  //Those values are usually 0,0
  let row = rowToPlace;
  let col = colToPlace;

  //Go to the next row if all columns are already filled out
  //Or return solution if already went through all the possible cells
  if (col === board[row].length) {
    col = 0;
    row = row + 1;

    //This means that we reached the end of the sudoku board
    if (row === board.length) {
      return {
        isBackTrackingSuccess: true,
        board: board,
        backtrackingChangesSteps: backtrackingChangesSteps
      };
    }
  }

  // Skip entries already filled out. They already have a value in them (not editable).
  if (board[row][col] !== 0) {
    return canSolveSudokuFromCell(
      board,
      row,
      col + 1,
      backtrackingChangesSteps
    );
  }

  //Go through all the possible numbers to be put in the cell
  //if successfull, go to the next column
  for (let value = 1; value <= board.length; value++) {
    const numToPlace = value;
    if (canPlaceValue(board, row, col, numToPlace)) {
      board[row][col] = numToPlace;
      let changeObject = { rowIndex: row, cellIndex: col, value: numToPlace };
      //keep track of the decisions made
      backtrackingChangesSteps.push(changeObject);
      if (
        canSolveSudokuFromCell(board, row, col + 1, backtrackingChangesSteps)
          .isBackTrackingSuccess
      ) {
        return {
          isBackTrackingSuccess: true,
          board: board,
          backtrackingChangesSteps: backtrackingChangesSteps
        };
      }
      board[row][col] = 0; //if unsuccesfull reset value to 0
    }
  }

  return {
    isBackTrackingSuccess: false,
    board: board,
    backtrackingChangesSteps: backtrackingChangesSteps
  };
};

/**
 * Checks if two arrays (only populated with numbers) are equal
 */
export const equal = (array1, array2) => {
  return JSON.stringify(array1) === JSON.stringify(array2);
};
