import types from './types';

const handleUpdateCell = (value, rowIndex, cellIndex) => {
  return {
    type: types.UPDATE_CELL,
    payload: {
      value: value,
      rowIndex: rowIndex,
      cellIndex: cellIndex
    }
  };
};

export { handleUpdateCell };
