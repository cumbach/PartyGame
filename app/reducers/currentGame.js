import { handleActions } from 'redux-actions';

const defaultState = {
  currentGame: 0, tableState: 'new'
};

export default handleActions({
  SET_CURRENT_GAME: (state, gameNumber) => ({
    ...state,
    currentGameNumber: gameNumber.payload
  }),
  SHIFT_TABLE_STATE: (state, action) => ({
    ...state,
    tableState: action.payload
  }),
  RESTART_GAME: (state) => (defaultState)
}, defaultState);
