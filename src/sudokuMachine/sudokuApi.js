import axios from 'axios';

//The api urls
//validate will not be used, i think...
const sudokuApiUrl = {
  newBoard: 'https://sugoku.herokuapp.com/board?difficulty=easy',
  solveBoard: 'https://sugoku.herokuapp.com/solve',
  validateBoard: 'https://sugoku.herokuapp.com/validate'
};

//headers
const headersForSolution = {
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
};

/**
 * API instructions to encode the board before posting it
 */
const encodeBoard = (board) =>
  board.reduce(
    (result, row, i) =>
      result +
      `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? '' : '%2C'}`,
    ''
  );

const encodeParams = (params) =>
  Object.keys(params)
    .map((key) => key + `= %5B${encodeBoard(params[key])}%5D`)
    .join('&');

/**
 * Promise
 * GET new board
 */
export const getNewSudokuBoardPromise = () => {
  return axios
    .get(sudokuApiUrl.newBoard)
    .then((response) => {
      return response.data.board;
    })
    .catch(function(error) {
      console.log(error);
    });
};

/**
 * Promise
 * POST new board
 * result in solution of the game
 */
export const getSolutionOfSudokuBoardPromise = (board) => {
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

/**
 * Async
 * GET new board
 */
export const getNewSudokuBoard = async () => {
  let newBoardRes = await axios.get(sudokuApiUrl.newBoard);
  let board = newBoardRes.data.board;
  return board;
};

/**
 * Async
 * POST new board
 * result in solution of the game
 */
export const getSolutionOfSudokuBoard = async (board) => {
  let solvedBoardRes = await axios.post(
    sudokuApiUrl.solveBoard,
    encodeParams({ board: board }),
    headersForSolution
  );
  return solvedBoardRes.data.solution;
};
