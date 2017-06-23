import { createActions } from 'redux-actions';

const {
  setPlayerNumber,
  setCurrentGame,
  setPlayerScores,
  setPlayerOrder,
  shiftPlayerOrder,
  shiftTableState,
  winnerSelected,
  loserSelected,
  restartGame
} = createActions(
  'SET_PLAYER_NUMBER',
  'SET_CURRENT_GAME',
  'SET_PLAYER_SCORES',
  'SET_PLAYER_ORDER',
  'SHIFT_PLAYER_ORDER',
  'SHIFT_TABLE_STATE',
  'WINNER_SELECTED',
  'LOSER_SELECTED',
  'RESTART_GAME'
);

module.exports = {
  setPlayerNumber,
  setCurrentGame,
  setPlayerScores,
  setPlayerOrder,
  shiftPlayerOrder,
  shiftTableState,
  winnerSelected,
  loserSelected,
  restartGame
};
