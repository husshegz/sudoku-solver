import INITIAL_STATE from './boardReducer';
import { equal } from '../sudokuMachine/sudokuSolver';

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
    backtrackingChangesSteps: payload.result.backtrackingChangesSteps,
    isBackTrackingSolutionCorrect: payload.result.isBackTrackingSolutionCorrect,
    solution: payload.result.solution,
    isBackTrackingSuccess: payload.result.isBackTrackingSuccess
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
  return {
    board:
      solution && solution.length
        ? JSON.parse(JSON.stringify(solution))
        : INITIAL_STATE.solution
  };
};

export const sanitizeStateToValidateSolution = (board, solution) => {
  let solutionBoard =
    solution && solution.length ? solution : INITIAL_STATE.solution;
  let currentBoard = board && board.length ? board : INITIAL_STATE.board;
  if (equal(solutionBoard, currentBoard)) {
    alert(true);
    return {
      isSolutionValid: true
    };
  } else {
    alert(false);
    return {
      isSolutionValid: false
    };
  }
};
