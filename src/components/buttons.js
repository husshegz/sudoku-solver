import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';

import {
  Row,
  Col,
  Button,
  ButtonGroup,
  Dropdown,
  DropdownButton
} from 'react-bootstrap';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core';
import { MdUndo } from 'react-icons/md';

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

import { DIFFICULTIES_MENU } from '../constants';

const useStyles = makeStyles({
  slider: {
    width: '50%',
    marginLeft: '5%',
    top: '25%',
    color: 'black'
  },
  buttonCol: {
    margin: '2%'
  }
});

const Buttons = () => {
  const {
    backtrackingChangesSteps,
    backTrackingSpeed,
    difficulty,
    isSolutionValid
  } = useSelector((state) => ({
    ...state.boardReducer
  }));

  const dispatch = useDispatch();
  const classes = useStyles();
  const { width, height } = useWindowSize();

  const makeRequestForNewGame = async (eventKey) => {
    setDifficulty(eventKey);
    let difficulty = DIFFICULTIES_MENU[eventKey];
    let result = await getNewBoardAndSolveAsync(difficulty);
    dispatch(handleNewBoard(result));
  };

  const backTrack = () => {
    dispatch(handleResetBoard());
    for (let x = 0; x < backtrackingChangesSteps.length; x++) {
      setTimeout(
        (y) => {
          //console.log('%d => %d', y, y);
          //console.log(backtrackingChangesSteps[y]);
          let { rowIndex, cellIndex, value } = backtrackingChangesSteps[y];
          dispatch(handleUpdateCell(value, rowIndex, cellIndex));
        },
        x * backtrackingChangesSteps.length * Math.round(1 / backTrackingSpeed),
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
      {isSolutionValid ? <Confetti width={width} height={height} /> : <></>}
      <Row className='buttons'>
        <Col className={classes.buttonCol}>
          <Dropdown as={ButtonGroup}>
            <Button
              variant='outline-dark'
              onClick={async (eventKey) =>
                await makeRequestForNewGame(eventKey)
              }
            >
              New
            </Button>
            <Dropdown.Toggle
              split
              variant='outline-dark'
              id='dropdown-basic-button'
            />
            <Dropdown.Menu>
              {DIFFICULTIES_MENU.map((difficulty, index) => {
                return (
                  <Dropdown.Item
                    eventKey={index}
                    onSelect={async (eventKey) =>
                      await makeRequestForNewGame(eventKey)
                    }
                  >
                    {difficulty}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col className={classes.buttonCol}>
          <ButtonGroup>
            <Button variant='outline-dark' onClick={() => undoAction()}>
              Undo
            </Button>
            <Button variant='outline-dark' onClick={() => validateSolution()}>
              Validate
            </Button>
            <Button variant='outline-dark' onClick={() => resetBoard()}>
              Reset
            </Button>
            <Button variant='outline-dark' onClick={() => solveInstantly()}>
              Solve
            </Button>
            <Button
              size='md'
              variant='outline-dark'
              onClick={() => backTrack()}
            >
              Backtrack
            </Button>
          </ButtonGroup>
        </Col>
        <Col className={classes.buttonCol}>
          <span>Speed :</span>
          <Slider
            aria-label='custom thumb label'
            min={1}
            max={10}
            defaultValue={5}
            onChange={(e, val) => backTrackSpeedChange(val)}
            className={classes.slider}
          />
        </Col>
      </Row>
    </>
  );
};

export default Buttons;
