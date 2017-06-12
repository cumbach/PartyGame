import { handleActions } from 'redux-actions';

export default handleActions({
  SET_CURRENT_GAME: (state, gameNumber) => ({
    currentGameNumber: gameNumber.payload
  })
}, { currentGame: 0 });
