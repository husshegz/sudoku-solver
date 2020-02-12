import React from 'react';

import { Container, Col, Row, Jumbotron } from 'react-bootstrap';

import Board from './components/board';
import './App.css';
import { getNewBoardAndSolveAsync } from './sudokuMachine/sudokuSolver';
import { useDispatch, useSelector } from 'react-redux';
import { handleNewBoard } from './actions';

const App = () => {
  const reducer = useSelector((state) => ({
    ...state.boardReducer
  }));
  const dispatch = useDispatch();

  const makeRequest = async () => {
    let result = await getNewBoardAndSolveAsync();
    dispatch(handleNewBoard(result));
  };

  const renderBoard = () => {
    return <Board />;
  };

  const testboardrerender = (row, col) => {
    //let newBoard = [...board];
    //ewBoard[row][col] += 1;
    //setBoard(newBoard);
  };

  return (
    <Container className='App'>
      <Row className='header'>
        <Col xl={4}>Github Profile/Repo</Col>
        <Col xl={4}>Sudoku Solver Title</Col>
        <Col xl={4}>Put astupid emoji here</Col>
      </Row>
      <Row className='board'>
        <Col>
          {renderBoard()}
          <button onClick={() => testboardrerender(0, 0)}>
            hihihihihihihihihihih
          </button>
        </Col>
      </Row>
      <Row className='buttons'>
        <Col>
          <button onClick={async () => await makeRequest()}>newBoard</button>
        </Col>
        <Col>Reset</Col>
        <Col>Solve</Col>
        <Col>Backtrack</Col>
      </Row>
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
