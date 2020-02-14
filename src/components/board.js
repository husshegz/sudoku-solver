import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Table, Row, Col } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core';

import { handleUpdateCell } from '../actions/actions';

const useStyles = makeStyles({
  table: {
    minWidth: 800,
    borderStyle: 'solid',
    borderWidth: 4,
    borderColor: '#black'
  },
  input: {
    width: '100%',
    height: '100%',
    padding: '0.75rem',
    backgroundColor: 'white',
    color: '#282c34',
    textAlign: 'center',
    border: 'none',
    '&&:disabled': {
      fontWeight: 'bold',
      fontSize: '1.2em',
      color: 'black'
    }
  },
  cell: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    padding: 0,
    '&&&:focus': {
      borderStyle: 'solid',
      borderWidth: 0.5,
      borderColor: 'black',
      padding: 0
    }
  },
  cellThird: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    borderRightStyle: 'solid',
    borderRightWidth: 4,
    borderRightColor: 'black',
    padding: 0,
    '&&&:focus': {
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: 'black',
      borderRightStyle: 'solid',
      borderRightWidth: 4,
      borderRightColor: 'black',
      padding: 0
    }
  },
  rowThird: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    borderBottomStyle: 'solid',
    borderBottomWidth: 4,
    borderBottomColor: 'black'
  }
});

const Board = () => {
  const {
    board,
    ogBoard,
    selectedRow,
    selectedCol,
    isCurrentlyBacktracking
  } = useSelector((state) => ({
    ...state.boardReducer
  }));
  const dispatch = useDispatch();

  //Create the classes of the table
  const classes = useStyles();

  //This function is called to see if the cell should be bordered or not
  const getProperStyle = (index, style) => {
    return index && (index + 1) % 3 === 0 ? style : classes.cell;
  };

  //Function to render each cell
  const renderCell = (cellValue, cellIndex, rowIndex) => {
    const styleOfCell = getProperStyle(cellIndex, classes.cellThird);
    const styleOfInput = classes.input;
    const isCellPlayable = ogBoard[rowIndex][cellIndex] === 0;
    let extraStyle = {};
    if (
      selectedRow === rowIndex &&
      selectedCol === cellIndex &&
      isCurrentlyBacktracking
    ) {
      extraStyle = {
        backgroundColor: 'grey'
      };
    }
    return (
      <td
        key={`${rowIndex}-${cellIndex}`}
        className={styleOfCell}
        style={{
          alignText: 'center',
          padding: 0
        }}
      >
        <input
          value={cellValue ? cellValue : '_'}
          style={extraStyle}
          className={styleOfInput}
          onKeyPress={(e) =>
            dispatch(handleUpdateCell(e.key, rowIndex, cellIndex, false))
          }
          type='number'
          onChange={() => {
            return; //need to put this because of consolo "warning"
          }}
          disabled={!isCellPlayable}
        ></input>
      </td>
    );
  };

  //Function to render a row
  const renderRow = (row, rowIndex) => {
    const styleOfRow = getProperStyle(rowIndex, classes.rowThird);
    return (
      <tr key={`row-${rowIndex}`} className={styleOfRow}>
        {row.map((col, colIndex) => {
          return renderCell(col, colIndex, rowIndex);
        })}
      </tr>
    );
  };

  //render()
  return (
    <>
      <Row className='board'>
        <Col>
          <Table
            responsive='xl'
            style={{
              borderStyle: 'solid',
              borderWidth: 4,
              borderColor: '#black'
            }}
          >
            <tbody>
              {board && board.length ? (
                board.map((row, rowIndex) => {
                  return renderRow(row, rowIndex);
                })
              ) : (
                <></>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  );
};

export default Board;
