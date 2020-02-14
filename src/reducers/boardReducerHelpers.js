import { equal } from '../sudokuMachine/sudokuSolver';
import { INITIAL_STATE, DIFFICULTIES_MENU } from '../constants';

export const sanitizeUserInputandTable = (board, payload, history) => {
  let newBoard = JSON.parse(JSON.stringify(board));
  let newHistory = JSON.parse(JSON.stringify(history));
  let { isCurrentlyBacktracking, rowIndex, cellIndex, userInput } = payload;

  let valueToChange = 0;
  //Make sure it's a number between 1-9 the valid numbers for a sudoku board
  let reg = new RegExp('^[1-9]*$');
  if (reg.test(userInput)) {
    valueToChange = parseInt(userInput);
    newHistory.push(board);
  }
  newBoard[rowIndex][cellIndex] = valueToChange;
  return {
    board: newBoard,
    history: newHistory,
    selectedRow: rowIndex,
    selectedCol: cellIndex,
    isCurrentlyBacktracking: isCurrentlyBacktracking
  };
};

export const sanitizeNewBoardState = (payload) => {
  let newOgBoard = JSON.parse(JSON.stringify(payload.result.ogBoard));

  return {
    ...INITIAL_STATE,
    isBackTrackingSuccess: payload.result.isBackTrackingSuccess,
    solution: payload.result.solution,
    board: newOgBoard,
    isBackTrackingSolutionCorrect: payload.result.isBackTrackingSolutionCorrect,
    ogBoard: payload.result.ogBoard,
    backtrackingChangesSteps: payload.result.backtrackingChangesSteps
  };
};

export const sanitizeResetBoardState = (ogBoard) => {
  let newOgBoard = INITIAL_STATE.ogBoard;
  if (ogBoard.length) {
    newOgBoard = JSON.parse(JSON.stringify(ogBoard));
  }
  return {
    board: newOgBoard,
    history: INITIAL_STATE.history,
    isSolutionValid: INITIAL_STATE.isSolutionValid,
    selectedRow: INITIAL_STATE.selectedRow,
    selectedCol: INITIAL_STATE.selectedCol,
    isCurrentlyBacktracking: INITIAL_STATE.isCurrentlyBacktracking
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

export const sanitizeStateToValidateSolution = (
  board,
  solution,
  isSolutionValid,
  isCurrentlyBacktracking
) => {
  let solutionBoard =
    solution && solution.length ? solution : INITIAL_STATE.solution;
  let currentBoard = board && board.length ? board : INITIAL_STATE.board;
  if (equal(solutionBoard, currentBoard)) {
    return {
      isSolutionValid: true,
      isCurrentlyBacktracking: isCurrentlyBacktracking
    };
  } else {
    return {
      isSolutionValid: false
    };
  }
};

export const sanitizeStateUndoMove = (history) => {
  if (history && history.length) {
    const previousBoard = history[history.length - 1];
    const newHistory = history.slice(0, history.length - 1);
    return {
      history: newHistory,
      board: previousBoard,
      isSolutionValid: false,
      isCurrentlyBacktracking: false
    };
  }
  return {};
};

export const sanitizeStateBackTrackingSpeed = (payload) => {
  return {
    backTrackingSpeed: payload.backTrackingSpeed
  };
};

export const sanitizeStateBoardDifficulty = (payload) => {
  return {
    difficulty: DIFFICULTIES_MENU[payload.eventKey]
  };
};
