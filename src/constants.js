const DIFFICULTIES_MENU = ['Easy', 'Medium', 'Hard', 'Random'];
const INITIAL_STATE = {
  isBackTrackingSuccess: false,
  solution: [],
  board: [],
  backtrackingChangesSteps: [],
  isBackTrackingSolutionCorrect: false,
  ogBoard: [],
  isSolutionValid: false,
  history: [],
  backTrackingSpeed: 25,
  difficulty: 'Hard',
  boardConflicts: []
};

export { DIFFICULTIES_MENU, INITIAL_STATE };
