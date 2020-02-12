import React from 'react';

import { Container, Col, Row, Jumbotron } from 'react-bootstrap';

import Board from './components/board';
import Buttons from './components/buttons';
import './App.css';
import { getNewBoardAndSolveAsync } from './sudokuMachine/sudokuSolver';
import { useDispatch, useSelector } from 'react-redux';
import { handleNewBoard } from './actions';

const App = () => {
  const dispatch = useDispatch();

  const makeRequest = async () => {
    let result = await getNewBoardAndSolveAsync();
    dispatch(handleNewBoard(result));
  };

  const renderBoard = () => {
    return <Board />;
  };
  const renderButtons = () => {
    return <Buttons />;
  };

  return (
    <Container className='App'>
      <Row className='header'>
        <Col xl={4}>Github Profile/Repo</Col>
        <Col xl={4}>Sudoku Solver Title</Col>
        <Col xl={4}>Put astupid emoji here</Col>
      </Row>
      <Row className='board'>
        <Col>{renderBoard()}</Col>
      </Row>
      <Row className='buttons'>{renderButtons()}</Row>
      <Row className='buttons'>
        <Col>Backtrack</Col>
        <Col>Undo</Col>
      </Row>
      <Row className='footer'>
        <Col>
          <Jumbotron>footer</Jumbotron>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
