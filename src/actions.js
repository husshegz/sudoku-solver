import types from './types';

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

const handleNewBoard = (result) => {
  return {
    type: types.NEW_BOARD,
    payload: {
      result: result
    }
  };
};

const handleResetBoard = () => {
  return {
    type: types.RESET_BOARD
  };
};

const handleBackTrackBoard = () => {
  return {
    type: types.BACKTRACK_BOARD
  };
};

const handleSolveInstantly = () => {
  return {
    type: types.SOLVE_INSTANTLY
  };
};

const handleValidateSolutionBoard = () => {
  return {
    type: types.VALIDATE_SOLUTION
  };
};

export {
  handleUpdateCell,
  handleNewBoard,
  handleResetBoard,
  handleBackTrackBoard,
  handleSolveInstantly,
  handleValidateSolutionBoard
};
