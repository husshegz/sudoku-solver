const DIFFICULTIES_MENU = ['Easy', 'Medium', 'Hard', 'Random'];
const INITIAL_STATE = {
  isBackTrackingSuccess: true,
  solution: [
    [2, 6, 1, 5, 8, 3, 4, 9, 7],
    [4, 3, 5, 1, 7, 9, 2, 6, 8],
    [7, 8, 9, 2, 4, 6, 1, 3, 5],
    [1, 2, 3, 4, 5, 7, 6, 8, 9],
    [5, 4, 6, 3, 9, 8, 7, 1, 2],
    [8, 9, 7, 6, 1, 2, 3, 5, 4],
    [3, 1, 4, 8, 2, 5, 9, 7, 6],
    [6, 7, 8, 9, 3, 4, 5, 2, 1],
    [9, 5, 2, 7, 6, 1, 8, 4, 3]
  ],
  board: [
    [0, 6, 0, 5, 0, 0, 0, 0, 0],
    [0, 3, 0, 1, 7, 0, 0, 6, 0],
    [7, 8, 0, 0, 4, 6, 0, 0, 5],
    [1, 2, 0, 0, 0, 7, 6, 8, 0],
    [5, 4, 0, 0, 0, 8, 0, 0, 0],
    [0, 9, 0, 6, 0, 0, 3, 0, 4],
    [3, 0, 4, 0, 0, 0, 0, 0, 6],
    [6, 7, 0, 9, 3, 0, 0, 2, 0],
    [9, 5, 2, 7, 0, 0, 0, 0, 3]
  ],
  backtrackingChangesSteps: [
    {
      rowIndex: 0,
      cellIndex: 0,
      value: 2
    },
    {
      rowIndex: 0,
      cellIndex: 2,
      value: 1
    },
    {
      rowIndex: 0,
      cellIndex: 4,
      value: 8
    },
    {
      rowIndex: 0,
      cellIndex: 5,
      value: 3
    },
    {
      rowIndex: 0,
      cellIndex: 6,
      value: 4
    },
    {
      rowIndex: 0,
      cellIndex: 7,
      value: 7
    },
    {
      rowIndex: 0,
      cellIndex: 8,
      value: 9
    },
    {
      rowIndex: 1,
      cellIndex: 0,
      value: 4
    },
    {
      rowIndex: 1,
      cellIndex: 2,
      value: 5
    },
    {
      rowIndex: 1,
      cellIndex: 5,
      value: 2
    },
    {
      rowIndex: 1,
      cellIndex: 6,
      value: 8
    },
    {
      rowIndex: 1,
      cellIndex: 5,
      value: 9
    },
    {
      rowIndex: 1,
      cellIndex: 6,
      value: 2
    },
    {
      rowIndex: 1,
      cellIndex: 8,
      value: 8
    },
    {
      rowIndex: 2,
      cellIndex: 2,
      value: 9
    },
    {
      rowIndex: 2,
      cellIndex: 3,
      value: 2
    },
    {
      rowIndex: 2,
      cellIndex: 6,
      value: 1
    },
    {
      rowIndex: 2,
      cellIndex: 7,
      value: 3
    },
    {
      rowIndex: 3,
      cellIndex: 2,
      value: 3
    },
    {
      rowIndex: 3,
      cellIndex: 3,
      value: 4
    },
    {
      rowIndex: 3,
      cellIndex: 4,
      value: 5
    },
    {
      rowIndex: 3,
      cellIndex: 4,
      value: 9
    },
    {
      rowIndex: 1,
      cellIndex: 6,
      value: 8
    },
    {
      rowIndex: 1,
      cellIndex: 8,
      value: 2
    },
    {
      rowIndex: 2,
      cellIndex: 2,
      value: 9
    },
    {
      rowIndex: 2,
      cellIndex: 3,
      value: 2
    },
    {
      rowIndex: 2,
      cellIndex: 6,
      value: 1
    },
    {
      rowIndex: 2,
      cellIndex: 7,
      value: 3
    },
    {
      rowIndex: 3,
      cellIndex: 2,
      value: 3
    },
    {
      rowIndex: 3,
      cellIndex: 3,
      value: 4
    },
    {
      rowIndex: 3,
      cellIndex: 4,
      value: 5
    },
    {
      rowIndex: 3,
      cellIndex: 4,
      value: 9
    },
    {
      rowIndex: 1,
      cellIndex: 2,
      value: 9
    },
    {
      rowIndex: 1,
      cellIndex: 5,
      value: 2
    },
    {
      rowIndex: 1,
      cellIndex: 6,
      value: 8
    },
    {
      rowIndex: 0,
      cellIndex: 7,
      value: 9
    },
    {
      rowIndex: 0,
      cellIndex: 8,
      value: 7
    },
    {
      rowIndex: 1,
      cellIndex: 0,
      value: 4
    },
    {
      rowIndex: 1,
      cellIndex: 2,
      value: 5
    },
    {
      rowIndex: 1,
      cellIndex: 5,
      value: 2
    },
    {
      rowIndex: 1,
      cellIndex: 6,
      value: 8
    },
    {
      rowIndex: 1,
      cellIndex: 5,
      value: 9
    },
    {
      rowIndex: 1,
      cellIndex: 6,
      value: 2
    },
    {
      rowIndex: 1,
      cellIndex: 8,
      value: 8
    },
    {
      rowIndex: 2,
      cellIndex: 2,
      value: 9
    },
    {
      rowIndex: 2,
      cellIndex: 3,
      value: 2
    },
    {
      rowIndex: 2,
      cellIndex: 6,
      value: 1
    },
    {
      rowIndex: 2,
      cellIndex: 7,
      value: 3
    },
    {
      rowIndex: 3,
      cellIndex: 2,
      value: 3
    },
    {
      rowIndex: 3,
      cellIndex: 3,
      value: 4
    },
    {
      rowIndex: 3,
      cellIndex: 4,
      value: 5
    },
    {
      rowIndex: 3,
      cellIndex: 8,
      value: 9
    },
    {
      rowIndex: 4,
      cellIndex: 2,
      value: 6
    },
    {
      rowIndex: 4,
      cellIndex: 3,
      value: 3
    },
    {
      rowIndex: 4,
      cellIndex: 4,
      value: 1
    },
    {
      rowIndex: 4,
      cellIndex: 6,
      value: 7
    },
    {
      rowIndex: 4,
      cellIndex: 4,
      value: 2
    },
    {
      rowIndex: 4,
      cellIndex: 6,
      value: 7
    },
    {
      rowIndex: 4,
      cellIndex: 7,
      value: 1
    },
    {
      rowIndex: 4,
      cellIndex: 4,
      value: 9
    },
    {
      rowIndex: 4,
      cellIndex: 6,
      value: 7
    },
    {
      rowIndex: 4,
      cellIndex: 7,
      value: 1
    },
    {
      rowIndex: 4,
      cellIndex: 8,
      value: 2
    },
    {
      rowIndex: 5,
      cellIndex: 0,
      value: 8
    },
    {
      rowIndex: 5,
      cellIndex: 2,
      value: 7
    },
    {
      rowIndex: 5,
      cellIndex: 4,
      value: 1
    },
    {
      rowIndex: 5,
      cellIndex: 5,
      value: 2
    },
    {
      rowIndex: 5,
      cellIndex: 7,
      value: 5
    },
    {
      rowIndex: 6,
      cellIndex: 1,
      value: 1
    },
    {
      rowIndex: 6,
      cellIndex: 3,
      value: 8
    },
    {
      rowIndex: 6,
      cellIndex: 4,
      value: 2
    },
    {
      rowIndex: 6,
      cellIndex: 5,
      value: 5
    },
    {
      rowIndex: 6,
      cellIndex: 6,
      value: 9
    },
    {
      rowIndex: 6,
      cellIndex: 7,
      value: 7
    },
    {
      rowIndex: 7,
      cellIndex: 2,
      value: 8
    },
    {
      rowIndex: 7,
      cellIndex: 5,
      value: 1
    },
    {
      rowIndex: 7,
      cellIndex: 6,
      value: 5
    },
    {
      rowIndex: 7,
      cellIndex: 5,
      value: 4
    },
    {
      rowIndex: 7,
      cellIndex: 6,
      value: 5
    },
    {
      rowIndex: 7,
      cellIndex: 8,
      value: 1
    },
    {
      rowIndex: 8,
      cellIndex: 4,
      value: 6
    },
    {
      rowIndex: 8,
      cellIndex: 5,
      value: 1
    },
    {
      rowIndex: 8,
      cellIndex: 6,
      value: 8
    },
    {
      rowIndex: 8,
      cellIndex: 7,
      value: 4
    }
  ],
  isBackTrackingSolutionCorrect: true,
  ogBoard: [
    [0, 6, 0, 5, 0, 0, 0, 0, 0],
    [0, 3, 0, 1, 7, 0, 0, 6, 0],
    [7, 8, 0, 0, 4, 6, 0, 0, 5],
    [1, 2, 0, 0, 0, 7, 6, 8, 0],
    [5, 4, 0, 0, 0, 8, 0, 0, 0],
    [0, 9, 0, 6, 0, 0, 3, 0, 4],
    [3, 0, 4, 0, 0, 0, 0, 0, 6],
    [6, 7, 0, 9, 3, 0, 0, 2, 0],
    [9, 5, 2, 7, 0, 0, 0, 0, 3]
  ],
  isSolutionValid: false,
  history: [],
  backTrackingSpeed: 5,
  difficulty: 'Hard'
};

export { DIFFICULTIES_MENU, INITIAL_STATE };
