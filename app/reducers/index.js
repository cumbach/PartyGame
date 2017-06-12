import { combineReducers } from 'redux';
import routes from './routes';
import players from './players';
import currentGame from './currentGame';


export default combineReducers({
  routes,
  players,
  currentGame
});
