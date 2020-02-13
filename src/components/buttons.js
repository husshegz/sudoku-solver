import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Row, Col, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import Slider from '@material-ui/core/Slider';

import { getNewBoardAndSolveAsync } from '../sudokuMachine/sudokuSolver';

import {
  handleNewBoard,
  handleResetBoard,
  handleUpdateCell,
  handleSolveInstantly,
  handleValidateGame,
  handleUndoMove,
  handleBackTrackSpeedChange,
  handleDifficultyChange
} from '../actions/actions';

import constants from '../constants';

const Buttons = () => {
  const {
    backtrackingChangesSteps,
    backTrackingSpeed,
    difficulty
  } = useSelector((state) => ({
    ...state.boardReducer
  }));
  const dispatch = useDispatch();

  const makeRequestForNewGame = async () => {
    let result = await getNewBoardAndSolveAsync(difficulty);
    dispatch(handleNewBoard(result));
  };

  const backTrack = () => {
    for (let x = 0; x < backtrackingChangesSteps.length; x++) {
      setTimeout(
        (y) => {
          //console.log('%d => %d', y, y);
          //console.log(backtrackingChangesSteps[y]);
          let { rowIndex, cellIndex, value } = backtrackingChangesSteps[y];
          dispatch(handleUpdateCell(value, rowIndex, cellIndex));
        },
        x * backTrackingSpeed + 1,
        x
      ); // we're passing x
    }
  };

  const backTrackSpeedChange = (e) => {
    dispatch(handleBackTrackSpeedChange(e));
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

  const undoAction = () => {
    dispatch(handleUndoMove());
  };

  const setDifficulty = (eventKey) => {
    dispatch(handleDifficultyChange(eventKey));
  };

  return (
    <>
      <Row className='buttons'>
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
          <Button variant='dark' onClick={() => solveInstantly()}>
            Solve Instantly
          </Button>
        </Col>
        <Col>
          <Button variant='primary' onClick={() => validateSolution()}>
            Validate
          </Button>
        </Col>
        <Col>
          <Button variant='primary' onClick={() => undoAction()}>
            Undo
          </Button>
        </Col>
        <Col>
          <DropdownButton id='dropdown-basic-button' title={difficulty}>
            {constants.DIFFICULTIES_MENU.map((difficulty, index) => {
              return (
                <Dropdown.Item
                  eventKey={index}
                  onSelect={(eventKey) => setDifficulty(eventKey)}
                >
                  {difficulty}
                </Dropdown.Item>
              );
            })}
          </DropdownButton>
        </Col>
      </Row>
      <Row className='buttons'>
        <Col xs={6}>
          <Slider
            aria-label='custom thumb label'
            min={1}
            max={100}
            defaultValue={50}
            onChange={(e, val) => backTrackSpeedChange(val)}
          />
        </Col>
        <Col xs={6}>
          <Button variant='dark' onClick={() => backTrack()}>
            BackTrack
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Buttons;
