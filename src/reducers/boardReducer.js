import types from '../types';
import {
  sanitizeNewBoardState,
  sanitizeUserInputandTable,
  sanitizeResetBoardState,
  sanitizeStateToSolveInstantly
} from './boardReducerHelpers';

let INITIAL_STATE = {
  isSolved: false,
  solution: [],
  board: [],
  changesArraySolved: [],
  isSolutionCorrect: false,
  ogBoard: []
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
        ...sanitizeNewBoardState(action.payload)
      };
    case types.RESET_BOARD:
      return {
        ...state,
        ...sanitizeResetBoardState(state.ogBoard)
      };
    case types.BACKTRACK_BOARD:
      return {
        ...state
      };
    case types.SOLVE_INSTANTLY:
      return {
        ...state,
        ...sanitizeStateToSolveInstantly(state.solution)
      };
    default:
      return {
        ...state
      };
  }
};

export default boardReducer;
