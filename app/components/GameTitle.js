import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { setCurrentGame } from '../actions/gameActions';
import GameMenu from './GameMenu';
import { minigames } from '../config/data';

class GameTitle extends Component {
  constructor(props) {
    super(props);
    this.state = { title: '', directions: '' };
  }

  componentWillMount() {
    const playableGames = this.props.currentGame.playableGames;
    const playableGameTitles = Object.keys(playableGames)

    const gameChoice = playableGameTitles[Math.floor(Math.random() * playableGameTitles.length)];
    const selectedGame = minigames.find(game => game.title === gameChoice)

    this.setState({ title: selectedGame.title });
    this.setState({ directions: selectedGame.directions });

    this.props.dispatch(setCurrentGame(gameChoice));
  }

  render() {
    return (
      <View style={styles.container}>
        <GameMenu />

        <Text style={styles.title}>
          {this.state.title}
        </Text>

        <Text style={styles.directions}>
          {this.state.directions}
        </Text>

        <TouchableOpacity
          key='start'
          onPress={() => Actions.gamePlay()}>
          <Text style={styles.start}>Start!</Text>
        </TouchableOpacity>

      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 30,
    color: 'black',
    textAlign: 'center',
    margin: 10,
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
