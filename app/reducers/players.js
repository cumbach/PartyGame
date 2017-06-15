import { handleActions } from 'redux-actions';

export default handleActions({
  INCREASE_PLAYER_COUNT: (state) => ({
    ...state,
    playerCount: state.playerCount + 1
  }),
  SET_PLAYER_SCORES: (state, action) => ({
    ...state,
    playerScores: action.payload
  })
}, { playerCount: 0, playerScores: {} });
