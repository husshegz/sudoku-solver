import React from 'react';

import { Container, Col, Row, Jumbotron } from 'react-bootstrap';

import './css/App.css';

import Board from './components/board';
import Buttons from './components/buttons';

const App = () => {
  /**
   * Render the Board Component
   */
  const renderBoard = () => {
    return <Board />;
  };
  /**
   * Render the Buttons Component
   */
  const renderButtons = () => {
    return <Buttons />;
  };

  /**
   * Render ALL THE APP
   */
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
      {renderButtons()}
      <Row className='footer'>
        <Col>
          <Jumbotron>footer</Jumbotron>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
