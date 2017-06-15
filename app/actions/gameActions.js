import { createActions } from 'redux-actions';

const {
  setCurrentGame,
  increasePlayerCount,
  setPlayerScores
} = createActions(
  'SET_CURRENT_GAME',
  'INCREASE_PLAYER_COUNT',
  'SET_PLAYER_SCORES'
);

module.exports = {
  setCurrentGame,
  increasePlayerCount,
  setPlayerScores
};
