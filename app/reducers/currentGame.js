import { handleActions } from 'redux-actions';

export default handleActions({
  SET_CURRENT_GAME: (state, gameNumber) => ({
    currentGameNumber: gameNumber.payload
  }),
  SHIFT_TABLE_STATE: (state, action) => ({
    ...state,
    tableState: action.payload
  })
}, { currentGame: 0, tableState: 'new' });
