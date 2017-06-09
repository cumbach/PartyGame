import { createActions } from 'redux-actions';

const { increasePlayerCount } = createActions(
  'INCREASE_PLAYER_COUNT'
);

module.exports = {
  increasePlayerCount
};
