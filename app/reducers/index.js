import { combineReducers } from 'redux';
import routes from './routes';
import players from './players';

export default combineReducers({
  routes,
  players
});
