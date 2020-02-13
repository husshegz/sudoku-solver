import types from '../types';
import {
  sanitizeNewBoardState,
  sanitizeUserInputandTable,
  sanitizeResetBoardState,
  sanitizeStateToSolveInstantly,
  sanitizeStateToValidateSolution,
  sanitizeStateUndoMove,
  sanitizeStateBackTrackingSpeed
} from './boardReducerHelpers';

let INITIAL_STATE = {
  isBackTrackingSuccess: false,
  solution: [],
  board: [],
  backtrackingChangesSteps: [],
  isBackTrackingSolutionCorrect: false,
  ogBoard: [],
  isSolutionValid: false,
  history: [],
  backTrackingSpeed: 25
};

const boardReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.UPDATE_CELL:
      return {
        ...state,
        ...sanitizeUserInputandTable(state.board, action.payload, state.history)
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
    case types.UNDO_MOVE:
      return {
        ...state,
        ...sanitizeStateUndoMove(state.history)
      };
    case types.BACKTRACK_SPEED:
      return {
        ...state,
        ...sanitizeStateBackTrackingSpeed(action.payload)
      };
    default:
      return {
        ...state
      };
  }
};

export default boardReducer;
