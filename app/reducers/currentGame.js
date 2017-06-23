import { handleActions } from 'redux-actions';
import { minigames } from '../config/data';

const defaultPlayableGames = () => {
  const topics = {};
  minigames.forEach((game) => {
    topics[game.title] = game.topics.map((topic, idx) => {
      return [topic, game.subtopics ? game.subtopics[idx] : undefined];
    });
  });

  return topics;
}

const defaultState = () => {
  return {
    currentGame: 'Categories',
    tableState: 'new',
    playableGames: defaultPlayableGames()
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
  }
}, defaultState());
