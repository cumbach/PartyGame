import { handleActions } from 'redux-actions';

export default handleActions({
  INCREASE_PLAYER_COUNT: (state) => ({
    playerCount: state.playerCount + 1
  })
}, { playerCount: 0 });
