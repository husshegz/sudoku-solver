import types from '../types';

const INITIAL_STATE = {
  isSolved: false,
  solution: [],
  board: [],
  changesArraySolved: [],
  isSolutionCorrect: false,
  ogBoard: []
};

const sanitizeUserInputandTable = (board, payload) => {
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

const sanitizeNewBoardstate = (payload) => {
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

const boardReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.UPDATE_CELL:
      return {
        ...state,
        board: sanitizeUserInputandTable(state.board, action.payload)
      };
    case types.NEW_BOARD:
      return {
        ...state,
        ...sanitizeNewBoardstate(action.payload)
      };
    default:
      return {
        ...state
      };
  }
};

export default boardReducer;
