import React from 'react';

import { Col, Button, ButtonToolbar } from 'react-bootstrap';
import { getNewBoardAndSolveAsync } from '../sudokuMachine/sudokuSolver';
import { useDispatch, useSelector } from 'react-redux';
import {
  handleNewBoard,
  handleResetBoard,
  handleBackTrackBoard,
  handleUpdateCell,
  handleSolveInstantly
} from '../actions';

const Buttons = () => {
  const { changesArraySolved, board } = useSelector((state) => ({
    ...state.boardReducer
  }));
  const dispatch = useDispatch();

  const makeRequestForNewGame = async () => {
    let result = await getNewBoardAndSolveAsync();
    dispatch(handleNewBoard(result));
  };

  const backTrack = () => {
    for (let x = 0; x < changesArraySolved.length; x++) {
      setTimeout(
        (y) => {
          console.log('%d => %d', y, y);
          console.log(changesArraySolved[y]);
          let { rowIndex, cellIndex, value } = changesArraySolved[y];
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
    </>
  );
};

export default Buttons;
