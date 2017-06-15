import { createActions } from 'redux-actions';

const {
  setCurrentGame,
  increasePlayerCount,
  setPlayerScores,
  setPlayerOrder,
  shiftPlayerOrder,
  shiftTableState,
  winnerSelected,
  loserSelected
} = createActions(
  'SET_CURRENT_GAME',
  'INCREASE_PLAYER_COUNT',
  'SET_PLAYER_SCORES',
  'SET_PLAYER_ORDER',
  'SHIFT_PLAYER_ORDER',
  'SHIFT_TABLE_STATE',
  'WINNER_SELECTED',
  'LOSER_SELECTED'
);

module.exports = {
  setCurrentGame,
  increasePlayerCount,
  setPlayerScores,
  setPlayerOrder,
  shiftPlayerOrder,
  shiftTableState,
  winnerSelected,
  loserSelected
};
