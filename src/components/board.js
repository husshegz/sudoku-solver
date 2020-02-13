import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Table } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core';

import { handleUpdateCell } from '../actions';

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
    padding: 0,
    color: 'blue',
    textAlign: 'center',
    border: 'none',
    backgroundColor: 'white',
    '&&:disabled': {
      fontWeight: 'bold',
      fontSize: '1.2em',
      color: 'black'
    }
  },
  cell: {
    borderStyle: 'solid',
    borderWidth: 0.5,
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
    borderWidth: 0.5,
    borderColor: 'black',
    borderRightStyle: 'solid',
    borderRightWidth: 4,
    borderRightColor: 'black',
    padding: 0,
    '&&&:focus': {
      borderStyle: 'solid',
      borderWidth: 0.5,
      borderColor: 'black',
      borderRightStyle: 'solid',
      borderRightWidth: 4,
      borderRightColor: 'black',
      padding: 0
    }
  },
  rowThird: {
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderColor: 'black',
    borderBottomStyle: 'solid',
    borderBottomWidth: 4,
    borderBottomColor: 'black'
  }
});

const Board = () => {
  const { board, ogBoard } = useSelector((state) => ({
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
    return (
      <td key={`${rowIndex}-${cellIndex}`} className={styleOfCell}>
        <input
          value={cellValue ? cellValue : '_'}
          className={styleOfInput}
          onKeyPress={(e) =>
            dispatch(handleUpdateCell(e.key, rowIndex, cellIndex))
          }
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
      <p>Click on the boxes to solve</p>
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
    </>
  );
};

export default Board;
