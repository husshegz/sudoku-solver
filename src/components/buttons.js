import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Col, Button } from 'react-bootstrap';

import { getNewBoardAndSolveAsync } from '../sudokuMachine/sudokuSolver';

import {
  handleNewBoard,
  handleResetBoard,
  handleUpdateCell,
  handleSolveInstantly,
  handleValidateGame
} from '../actions';

const Buttons = () => {
  const { backtrackingChangesSteps } = useSelector((state) => ({
    ...state.boardReducer
  }));
  const dispatch = useDispatch();

  const makeRequestForNewGame = async () => {
    let result = await getNewBoardAndSolveAsync();
    dispatch(handleNewBoard(result));
  };

  const backTrack = () => {
    for (let x = 0; x < backtrackingChangesSteps.length; x++) {
      setTimeout(
        (y) => {
          console.log('%d => %d', y, y);
          console.log(backtrackingChangesSteps[y]);
          let { rowIndex, cellIndex, value } = backtrackingChangesSteps[y];
          dispatch(handleUpdateCell(value, rowIndex, cellIndex));
        },
        x * 10,
        x
      ); // we're passing x
    }
  };

  const resetBoard = () => {
    dispatch(handleResetBoard());
  };

  const solveInstantly = () => {
    dispatch(handleSolveInstantly());
  };

  const validateSolution = () => {
    dispatch(handleValidateGame());
  };

  return (
    <>
      <Col>
        <Button
          variant='primary'
          onClick={async () => await makeRequestForNewGame()}
        >
          New
        </Button>
      </Col>
      <Col>
        <Button variant='secondary' onClick={() => resetBoard()}>
          Reset
        </Button>
      </Col>
      <Col>
        <Button variant='dark' onClick={() => backTrack()}>
          BackTrack
        </Button>
      </Col>
      <Col>
        <Button variant='dark' onClick={() => solveInstantly()}>
          Solve Instantly
        </Button>
      </Col>
      <Col>
        <Button variant='primary' onClick={() => validateSolution()}>
          Validate
        </Button>
      </Col>
    </>
  );
};

export default Buttons;
