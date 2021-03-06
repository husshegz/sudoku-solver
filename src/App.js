import React from 'react';

import { Container, Col, Row } from 'react-bootstrap';
import { GoMarkGithub } from 'react-icons/go';
import { MdHome } from 'react-icons/md';
import { FaLinkedin } from 'react-icons/fa';

import './css/App.css';

import Board from './components/board';
import Buttons from './components/buttons';

const App = () => {
  /**
   * Render the Board Component
   */
  const renderBoard = () => {
    return (
      <Row className='board'>
        <Col>
          <Board />
        </Col>
      </Row>
    );
  };
  /**
   * Render the Buttons Component
   */
  const renderButtons = () => {
    return <Buttons />;
  };

  const renderHeader = () => {
    return (
      <Row className='App-header'>
        <Col
          xl={4}
          style={{
            textAlign: 'left'
          }}
        >
          <a
            className={'personal-link'}
            target='_blank'
            rel='noopener noreferrer'
            href={'https://github.com/husshegz/sudoku-solver'}
          >
            <GoMarkGithub />
          </a>
        </Col>
        <Col xl={4}>Sudoku Solver</Col>
        <Col
          xl={4}
          style={{
            textAlign: 'right'
          }}
        >
          <a
            className={'personal-link'}
            target='_blank'
            rel='noopener noreferrer'
            href={'https://husshegz.github.io/'}
          >
            <MdHome />
          </a>
          <a
            href={'https://www.linkedin.com/in/husshegazy/'}
            rel='noopener noreferrer'
            target='_blank'
          >
            <FaLinkedin />
          </a>
        </Col>
      </Row>
    );
  };

  /**
   * Render ALL THE APP
   */
  return (
    <div>
      <Container className='App'>
        {renderHeader()}
        {renderBoard()}
        {renderButtons()}
      </Container>
    </div>
  );
};

export default App;
