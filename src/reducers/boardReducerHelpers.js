import INITIAL_STATE from './boardReducer';

export const sanitizeUserInputandTable = (board, payload) => {
  let newBoard = JSON.parse(JSON.stringify(board));
  let userInput = payload.value;
  let rowIndex = payload.rowIndex;
  let cellIndex = payload.cellIndex;

  let valueToChange = 0;
  //Make sure it's a number between 1-9 the valid numbers for a sudoku board
  let reg = new RegExp('^[1-9]*$');
  if (reg.test(userInput)) {
    valueToChange = parseInt(userInput);
  }
  newBoard[rowIndex][cellIndex] = valueToChange;
  return newBoard;
};

export const sanitizeNewBoardState = (payload) => {
  let newOgBoard = JSON.parse(JSON.stringify(payload.result.ogBoard));

  return {
    board: newOgBoard,
    ogBoard: payload.result.ogBoard,
    changesArraySolved: payload.result.changesArraySolved,
    isSolutionCorrect: payload.result.isSolutionCorrect,
    solution: payload.result.solution,
    isSolved: payload.result.isSolved
  };
};

export const sanitizeResetBoardState = (ogBoard) => {
  let newOgBoard = INITIAL_STATE.ogBoard;
  if (ogBoard.length) {
    newOgBoard = JSON.parse(JSON.stringify(ogBoard));
  }
  return {
    board: newOgBoard
  };
};

export const sanitizeStateToSolveInstantly = (solution) => {
  let solutionBoard = INITIAL_STATE.solution;
  if (solution.length) {
    solutionBoard = JSON.parse(JSON.stringify(solution));
  }
  return {
    board: solutionBoard
  };
};
