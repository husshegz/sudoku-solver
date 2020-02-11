import axios from 'axios';

const sudokuApiUrl = {
  newBoard: 'https://sugoku.herokuapp.com/board?difficulty=easy',
  solveBoard: 'https://sugoku.herokuapp.com/solve',
  validateBoard: 'https://sugoku.herokuapp.com/validate'
};

const headersForSolution = {
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
};

//This is due to api limitations, instruction are in the documentation of the api referenced
const encodeBoard = (board) =>
  board.reduce(
    (result, row, i) =>
      result +
      `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? '' : '%2C'}`,
    ''
  );

//This is due to api limitations, instruction are in the documentation of the api referenced
const encodeParams = (params) =>
  Object.keys(params)
    .map((key) => key + `= %5B${encodeBoard(params[key])}%5D`)
    .join('&');

//Calls sudoku api to generate a new board
export const getNewSudokuBoard = () => {
  return axios
    .get(sudokuApiUrl.newBoard)
    .then((response) => {
      return response.data.board;
    })
    .catch(function(error) {
      console.log(error);
    });
};

export const getSolutionOfSudokuBoard = (board) => {
  return axios
    .post(
      sudokuApiUrl.solveBoard,
      encodeParams({ board: board }),
      headersForSolution
    )
    .then((response) => {
      return response.data.solution;
    })
    .catch(function(error) {
      console.log(error);
    });
};
