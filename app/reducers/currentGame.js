import { handleActions } from 'redux-actions';
import { minigames } from '../config/data';

const defaultPlayableGames = () => {
  const topics = {};
  minigames.forEach((game) => {
    topics[game.title] = game.topics.map((topic, idx) => {
      return [topic, game.subtopics ? game.subtopics[idx] : undefined, game.multipleChoice];
    });
  });

  return topics;
}

const defaultState = () => {
  return {
    currentGame: 'Categories',
    tableState: 'new',
    playableGames: defaultPlayableGames(),
    removedGames: {},
    mode: 'FFA',
    teams: {},
    currentTurnNumber: 0
  };
};

export default handleActions({
  SET_CURRENT_GAME: (state, action) => ({
    ...state,
    currentGame: action.payload
  }),
  SHIFT_TABLE_STATE: (state, action) => ({
    ...state,
    tableState: action.payload
  }),
  RESTART_GAME: (state) => (defaultState()),
  SET_GAME_DURATION: (state, action) => ({
    ...state,
    duration: action.payload
  }),
  INCREMENT_TURN_NUMBER: (state) => ({
    ...state,
    currentTurnNumber: state.currentTurnNumber + 1
  }),
  REMOVE_GAME_TYPE: (state, action) => {
    let playableGames = state.playableGames;
    let removedGames = state.removedGames;

    removedGames[action.payload] = playableGames[action.payload];
    delete playableGames[action.payload];


    return {
      ...state,
      playableGames
    }
  },
  ADD_GAME_TYPE: (state, action) => {
    let playableGames = state.playableGames;
    let removedGames = state.removedGames;

    playableGames[action.payload] = removedGames[action.payload];
    delete removedGames[action.payload];

    return {
      ...state,
      playableGames
    }
  },
  TOPIC_SELECTED: (state, action) => {
    const currentGame = state.currentGame;
    const topicNumber = action.payload;
    let playableGames = state.playableGames;

    playableGames[currentGame].splice(topicNumber, 1);
    if (playableGames[currentGame].length === 0) {
      delete playableGames[currentGame];
    }

    if (Object.keys(playableGames).length === 0) {
      playableGames = defaultPlayableGames();
    }

    return {
      ...state,
      playableGames
    }
  },
  SET_GAME_MODE: (state, action) => ({
    ...state,
    mode: action.payload
  }),
  SET_TEAMS: (state, action) => ({
    ...state,
    teams: action.payload
  })
}, defaultState());
