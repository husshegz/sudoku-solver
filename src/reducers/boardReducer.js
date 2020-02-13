import types from '../types';
import {
  sanitizeNewBoardState,
  sanitizeUserInputandTable,
  sanitizeResetBoardState,
  sanitizeStateToSolveInstantly,
  sanitizeStateToValidateSolution
} from './boardReducerHelpers';

let INITIAL_STATE = {
  isBackTrackingSuccess: false,
  solution: [],
  board: [],
  backtrackingChangesSteps: [],
  isBackTrackingSolutionCorrect: false,
  ogBoard: [],
  isSolutionValid: false
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
    case types.VALIDATE_SOLUTION:
      return {
        ...state,
        ...sanitizeStateToValidateSolution(state.board, state.solution)
      };
    default:
      return {
        ...state
      };
  }
};

export default boardReducer;
