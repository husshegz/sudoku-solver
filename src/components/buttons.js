import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';

import {
  Row,
  Col,
  Button,
  ButtonGroup,
  Dropdown,
  Modal
} from 'react-bootstrap';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core';

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
    isSolutionValid
  } = useSelector((state) => ({
    ...state.boardReducer
  }));

  const [show, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [backtrackId, setBacktrackId] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const classes = useStyles();
  const { width, height } = useWindowSize();

  const makeRequestForNewGame = async (eventKey) => {
    setDifficulty(eventKey);
    let difficulty = DIFFICULTIES_MENU[eventKey];
    let result = await getNewBoardAndSolveAsync(difficulty);
    dispatch(handleNewBoard(result));
  };

  const backtrackFunc = (i) => {
    i + 1 === backtrackingChangesSteps.length
      ? setLoading(false)
      : setLoading(true);
    console.log('%d => %d', i, backtrackingChangesSteps[i]);
    let { rowIndex, cellIndex, value } = backtrackingChangesSteps[i];
    dispatch(handleUpdateCell(value, rowIndex, cellIndex));
  };

  const stopBackTrack = () => {
    for (let i = 0; i < backtrackId.length; i++) {
      if (i + 1 === backtrackId.length) {
        setLoading(false);
        dispatch(handleResetBoard());
      } else {
        setLoading(true);
      }
      clearTimeout(backtrackId[i]);
    }
  };

  const backTrack = () => {
    dispatch(handleResetBoard());
    for (let x = 0; x < backtrackingChangesSteps.length; x++) {
      const timeoutId = setTimeout(
        backtrackFunc,
        x *
          backtrackingChangesSteps.length *
          10 *
          Math.round(1 / backTrackingSpeed),
        x
      );
      backtrackId.push(timeoutId);
      setBacktrackId(backtrackId);
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
    if (!isSolutionValid) {
      handleShow();
    }
    dispatch(handleValidateGame());
  };

  const undoAction = () => {
    dispatch(handleUndoMove());
  };

  const setDifficulty = (eventKey) => {
    dispatch(handleDifficultyChange(eventKey));
  };

  const renderValidateModal = () => {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton />
        <Modal.Body closeButton>
          Nope! Almost there :) Keep Trying ^_^
        </Modal.Body>
      </Modal>
    );
  };

  const renderDifficultiesMenu = () => {
    return DIFFICULTIES_MENU.map((difficulty, index) => {
      return (
        <Dropdown.Item
          eventKey={index}
          onSelect={async (eventKey) => await makeRequestForNewGame(eventKey)}
          disabled={isLoading}
        >
          {difficulty}
        </Dropdown.Item>
      );
    });
  };

  return (
    <>
      {isSolutionValid ? <Confetti width={width} height={height} /> : <></>}
      <Row className='buttons'>
        <Col className={classes.buttonCol}>
          <Dropdown as={ButtonGroup} disabled={isLoading}>
            <Button
              variant='outline-dark'
              disabled={isLoading}
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
            <Dropdown.Menu>{renderDifficultiesMenu()}</Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col className={classes.buttonCol}>
          <ButtonGroup>
            <Button
              variant='outline-dark'
              onClick={() => undoAction()}
              disabled={isLoading}
            >
              Undos
            </Button>
            <Button
              variant='outline-dark'
              onClick={() => validateSolution()}
              disabled={isLoading}
            >
              Validate
            </Button>
            {renderValidateModal()}
            <Button
              variant='outline-dark'
              onClick={() => resetBoard()}
              disabled={isLoading}
            >
              Reset
            </Button>
            <Button
              variant='outline-dark'
              onClick={() => solveInstantly()}
              disabled={isLoading}
            >
              Solve
            </Button>
            <Button
              size='md'
              variant='outline-dark'
              onClick={() => {
                isLoading ? stopBackTrack() : backTrack();
              }}
            >
              {isLoading ? 'Stop...' : 'Backtrack'}
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
            disabled={isLoading}
          />
        </Col>
      </Row>
    </>
  );
};

export default Buttons;
