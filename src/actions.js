import types from './types';

/**
 * Action handler to update the value of a cell
 * Dipatched from:
 * - User inputs a value in an editable cell (Board-Component)
 * - Backtacking button (Buttons-Component)
 */
const handleUpdateCell = (value, rowIndex, cellIndex) => {
  return {
    type: types.UPDATE_CELL,
    payload: {
      value: value,
      rowIndex: rowIndex,
      cellIndex: cellIndex
    }
  };
};

/**
 * Action handler to get a new board
 * Dispatched from:
 * -New Board Button (Buttons-Component)
 */
const handleNewBoard = (result) => {
  return {
    type: types.NEW_BOARD,
    payload: {
      result: result
    }
  };
};

/**
 * Action handler to reset board to its original state
 * Dispatched from:
 * -Reset Button (Buttons-Component)
 */
const handleResetBoard = () => {
  return {
    type: types.RESET_BOARD
  };
};

/**
 * Action handler to backtrack board
 * Dispatched from:
 * N/A
 * Note : Thought i'd need it, might need later
 */
const handleBackTrackBoard = () => {
  return {
    type: types.BACKTRACK_BOARD
  };
};

/**
 * Action handler to solve the board instantly
 * Using the API-given solution
 * Dispatched from:
 * -Solve Instantly Button (Buttons-Component)
 */
const handleSolveInstantly = () => {
  return {
    type: types.SOLVE_INSTANTLY
  };
};

/**
 * Action handler to validate the current board
 * Is my current board the solution or not
 * Using the API-given solution
 * Dispatched from:
 * -Validate Button (Buttons-Component)
 */
const handleValidateGame = () => {
  return {
    type: types.VALIDATE_SOLUTION
  };
};

/**
 * Action handler to undo the last move
 * Dispatched from:
 * -Undo Button (Buttons-Component)
 */
const handleUndoMove = () => {
  return {
    type: types.UNDO_MOVE
  };
};

export {
  handleUpdateCell,
  handleNewBoard,
  handleResetBoard,
  handleBackTrackBoard,
  handleSolveInstantly,
  handleValidateGame,
  handleUndoMove
};
