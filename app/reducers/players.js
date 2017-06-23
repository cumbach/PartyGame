import { handleActions } from 'redux-actions';

export default handleActions({
  SET_PLAYER_NUMBER: (state, action) => ({
    ...state,
    playerCount: action.payload
  }),
  SET_PLAYER_SCORES: (state, action) => ({
    ...state,
    playerScores: action.payload
  }),
  SET_PLAYER_ORDER: (state, action) => ({
    ...state,
    playerOrder: action.payload
  }),
  SHIFT_PLAYER_ORDER: (state) => {
    state.playerOrder.push(state.playerOrder.shift());

    return {
      ...state,
      playerOrder: state.playerOrder
    };
  },
  WINNER_SELECTED: (state, action) => {
    const winner = action.payload;
    state.playerScores[winner] += 10;

    return {
      ...state,
      playerScores: state.playerScores
    };
  },
  LOSER_SELECTED: (state, action) => {
    const loser = action.payload;
    Object.keys(state.playerScores).forEach((player) => {
      if (player !== loser) {
        state.playerScores[player] += 10;
      }
    })

    return {
      ...state,
      playerScores: state.playerScores
    };
  }
}, { playerCount: 0, playerScores: {}, playerOrder: [] });
