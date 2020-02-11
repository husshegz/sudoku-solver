import types from '../types';

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

const boardReducer = (
  state = {
    board: [
      [3, 0, 6, 5, 0, 8, 4, 0, 0],
      [5, 2, 0, 0, 0, 0, 0, 0, 0],
      [0, 8, 7, 0, 0, 0, 0, 3, 1],
      [0, 0, 3, 0, 1, 0, 0, 8, 0],
      [9, 0, 0, 8, 6, 3, 0, 0, 5],
      [0, 5, 0, 0, 9, 0, 6, 0, 0],
      [1, 3, 0, 0, 0, 0, 2, 5, 0],
      [0, 0, 0, 0, 0, 0, 0, 7, 4],
      [0, 0, 5, 2, 0, 6, 3, 0, 0]
    ]
  },
  action
) => {
  switch (action.type) {
    case types.UPDATE_CELL:
      console.log(action.payload);
      let board = sanitizeUserInputandTable(state.board, action.payload);
      console.log(board);
      return {
        ...state,
        board: board
      };
    case types.NEW_BOARD:
      console.log('new board');
      return {
        ...state
      };
    default:
      return {
        ...state
      };
  }
};

export default boardReducer;
