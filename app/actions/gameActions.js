import { createActions } from 'redux-actions';

const {
  setPlayerNumber,
  setCurrentGame,
  removeGameType,
  addGameType,
  setPlayerScores,
  setPlayerOrder,
  setGameDuration,
  shiftPlayerOrder,
  shiftTableState,
  winnersSelected,
  loserSelected,
  restartGame,
  topicSelected,
  setGameMode,
  setTeams,
  selectDuelOpponentIdx,
  incrementTurnNumber
} = createActions(
  'SET_PLAYER_NUMBER',
  'SET_CURRENT_GAME',
  'REMOVE_GAME_TYPE',
  'ADD_GAME_TYPE',
  'SET_PLAYER_SCORES',
  'SET_PLAYER_ORDER',
  'SET_GAME_DURATION',
  'SHIFT_PLAYER_ORDER',
  'SHIFT_TABLE_STATE',
  'WINNERS_SELECTED',
  'LOSER_SELECTED',
  'RESTART_GAME',
  'TOPIC_SELECTED',
  'SET_GAME_MODE',
  'SET_TEAMS',
  'SELECT_DUEL_OPPONENT_IDX',
  'INCREMENT_TURN_NUMBER'
);

module.exports = {
  setPlayerNumber,
  setCurrentGame,
  removeGameType,
  addGameType,
  setPlayerScores,
  setPlayerOrder,
  setGameDuration,
  shiftPlayerOrder,
  shiftTableState,
  winnersSelected,
  loserSelected,
  restartGame,
  topicSelected,
  setGameMode,
  setTeams,
  selectDuelOpponentIdx,
  incrementTurnNumber
};
