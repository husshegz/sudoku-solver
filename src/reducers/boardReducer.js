import types from '../actions/types';
import {
  sanitizeNewBoardState,
  sanitizeUserInputandTable,
  sanitizeResetBoardState,
  sanitizeStateToSolveInstantly,
  sanitizeStateToValidateSolution,
  sanitizeStateUndoMove,
  sanitizeStateBackTrackingSpeed,
  sanitizeStateBoardDifficulty
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
  backTrackingSpeed: 25,
  difficulty: 'Hard',
  boardConflicts: []
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
    case types.DIFFICULTIES_CHANGE:
      return {
        ...state,
        ...sanitizeStateBoardDifficulty(action.payload)
      };
    case types.HOW_AM_I_DOING:
      return {
        ...state,
        boardConflicts: [{ row: 1 }]
      };
    default:
      return {
        ...state
      };
  }
};

export default boardReducer;
