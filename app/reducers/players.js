import _ from 'lodash';
import { handleActions } from 'redux-actions';

const defaultState = {
  playerCount: 0,
  playerScores: {},
  playerOrder: [],
  duelValue: undefined,
  duelOpponentIdx: undefined,
  disabledPlayers: []
}

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
  WINNERS_SELECTED: (state, action) => {
    const winners = action.payload;
    winners.forEach(winner => state.playerScores[winner] += 10);

    return {
      ...state,
      playerScores: state.playerScores
    };
  },
  DUEL_WINNER_SELECTED: (state, action) => {
    const winner = action.payload[0];
    const loser = action.payload[1];
    state.playerScores[winner] += state.duelValue;
    if (state.playerScores[loser] > 0) {
      state.playerScores[loser] -= state.duelValue;
    }

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
  },
  RESTART_GAME: (state) => (defaultState),
  SELECT_DUEL_VALUE: (state, action) => ({
    ...state,
    duelValue: action.payload
  }),
  SELECT_DUEL_OPPONENT_IDX: (state, action) => ({
    ...state,
    duelOpponentIdx: action.payload
  }),
  TIE_BREAKER: (state) => {
    const maxScore = _.max(Object.values(state.playerScores));
    const disabledPlayers = _.every(Object.keys(state.playerScores), (player) => {
      return state.playerScores[player] !== maxScore;
    });

    return {
      ...state,
      disabledPlayers: disabledPlayers
    }
  }
}, defaultState);
