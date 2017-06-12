import { createActions } from 'redux-actions';

const { setCurrentGame } = createActions(
  'SET_CURRENT_GAME'
);

const { increasePlayerCount } = createActions(
  'INCREASE_PLAYER_COUNT'
);

module.exports = {
  setCurrentGame,
  increasePlayerCount
};
