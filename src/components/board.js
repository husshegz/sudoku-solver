import React, { useState } from 'react';
import { Table } from 'react-bootstrap';

const Board = (board) => {
  const renderCell = (value, index) => {
    return <td>{value}</td>;
  };

  const renderRow = (row, rowIndex) => {
    return (
      <tr>
        {row.map((col, colIndex) => {
          return renderCell(col, colIndex);
        })}
      </tr>
    );
  };

  return (
    <>
      <p>WWWWWWWWWWW</p>
      <Table responsive='xl'>
        <tbody>
          {board.board.map((row, rowIndex) => {
            return renderRow(row, rowIndex);
          })}
        </tbody>
      </Table>
    </>
  );
};

export default Board;
