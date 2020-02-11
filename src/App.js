import React, { useState } from 'react';

import { Container, Col, Row, Jumbotron, Table } from 'react-bootstrap';

import Board from './components/board';
import './App.css';
import { getNewBoardAndSolveAsync } from './sudokuMachine/sudokuSolver';
import {
  getNewSudokuBoard,
  getSolutionOfSudokuBoard
} from './sudokuMachine/sudokuApi';

const boardDef = [
  [3, 0, 6, 5, 0, 8, 4, 0, 0],
  [5, 2, 0, 0, 0, 0, 0, 0, 0],
  [0, 8, 7, 0, 0, 0, 0, 3, 1],
  [0, 0, 3, 0, 1, 0, 0, 8, 0],
  [9, 0, 0, 8, 6, 3, 0, 0, 5],
  [0, 5, 0, 0, 9, 0, 6, 0, 0],
  [1, 3, 0, 0, 0, 0, 2, 5, 0],
  [0, 0, 0, 0, 0, 0, 0, 7, 4],
  [0, 0, 5, 2, 0, 6, 3, 0, 0]
];

const App = () => {
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
        <Col>New Board</Col>
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
