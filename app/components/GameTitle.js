import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import {
  setCurrentGame,
  setGameMode
} from '../actions/gameActions';
import { minigames } from '../config/data';

import GameMenu from './GameMenu';
import GameSettings from './GameSettings';


class GameTitle extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedGame: {}, displayBlind: true };
  }

  componentWillMount() {
    const playableGames = this.props.currentGame.playableGames;
    const currentGameTitle = this.props.currentGame.currentGame;
    const currentGameIdx = Object.keys(playableGames).findIndex(title => title === currentGameTitle);
    let playableGameTitles = Object.keys(playableGames);
    if (playableGameTitles.length > 1) {
      playableGameTitles.splice(currentGameIdx, 1);
    }

    if (this.props.currentGame.tieBreaker) {
      playableGameTitles = _.every(playableGameTitles, (title) => {
        const game = minigames.find(game => game.title === title);
        return game.completed === 'Winning' && game.modes === ['FFA'];
      })
    }
    // FOR TESTING: JUST SET SPECIFIC GAME TYPE
    // const gameChoice = 'Categories';
    const gameChoiceIdx = Math.floor(Math.random() * playableGameTitles.length);
    const gameChoice = playableGameTitles[gameChoiceIdx];
    const selectedGame = minigames.find(game => game.title === gameChoice);
    const gameModeIdx = Math.floor(Math.random() * selectedGame.modes.length);
    const gameMode = selectedGame.modes[gameModeIdx];
    // const gameMode = 'duel';

    this.props.dispatch(setCurrentGame(gameChoice));
    this.props.dispatch(setGameMode(gameMode));

    this.setState({ selectedGame: selectedGame });
  }

  blindPlayPressed() {
    this.setState({displayBlind: false})
  }

  renderNextButton() {
    const mode = this.props.currentGame.mode;

    if (mode === 'FFA') {
      return (
        <TouchableOpacity
          key='start'
          onPress={() => Actions.gamePlay()}
        >
          <Text style={styles.start}>Start!</Text>
        </TouchableOpacity>
      )
    } else if (mode === 'team') {
      return (
        <TouchableOpacity
          key='team'
          onPress={() => Actions.teamView()}
        >
          <Text style={styles.start}>Setup</Text>
        </TouchableOpacity>
      )
    } else if (mode === 'duel') {
      return (
        <TouchableOpacity
          key='duel'
          onPress={() => Actions.duelView()}
        >
          <Text style={styles.start}>Setup</Text>
        </TouchableOpacity>
      )
    }
  }

  renderDirections() {
    // Check is this game requires bringing the phone up off the table (Blind game)
    if (this.state.displayBlind && (this.state.selectedGame.title === 'Hum a Song' || this.state.selectedGame.title === 'Taboo' || this.state.selectedGame.title === 'Trivia' || this.state.selectedGame.title === "Simon Says")) {
      return (
        <View>
          <Text style={[styles.title, styles.blindTitle]}>
            BLIND GAME!
          </Text>

          <Text style={[{fontSize: 22}, styles.directions]}>
            Pick up the phone so that only the dealer can read the screen.
          </Text>

          <TouchableOpacity
            key='go'
            onPress={() => this.blindPlayPressed()}>
            <Text style={styles.start}>Go!</Text>
          </TouchableOpacity>
        </View>
      )

    } else {

      return (
        <View>
          <Text style={styles.title}>
            {this.state.selectedGame.title}
          </Text>
          <Text>
            {this.props.currentGame.tieBreaker ? 'Tie Breaker Round' : ''}
          </Text>
          <Text style={styles.directions}>
            {`Mode: ${this.props.currentGame.mode}`}
          </Text>
          <Text style={[styles.directions, this.state.selectedGame.style]}>
            {this.state.selectedGame.directions}
          </Text>

          {this.renderNextButton()}
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderDirections()}
        <GameMenu/>
        <GameSettings />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'white',
  },
  title: {
    fontSize: 30,
    color: 'black',
    textAlign: 'center',
    margin: 10,
  },
  blindTitle: {
    fontSize: 40,
  },
  directions: {
    fontSize: 22,
    color: 'black',
    textAlign: 'center',
    margin: 10,
  },
  start: {
    borderWidth:1,
    backgroundColor: 'lightgreen',
    overflow:'hidden', // doesn't work on Android??
    borderRadius: 5,
    padding: 10,
    marginTop: 20, //Needs adjusting
    fontSize: 34,
    color: 'black',
    textAlign: 'center',
    margin: 10,
  }

});

export default connect(({ currentGame }) => ({ currentGame }))(GameTitle);
