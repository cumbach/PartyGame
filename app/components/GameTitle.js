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
    this.state = { title: '', directions: '', displayBlind: true };
  }

  componentWillMount() {
    const playableGames = this.props.currentGame.playableGames;
    const playableGameTitles = Object.keys(playableGames)

    // FOR TESTING: JUST SET SPECIFIC GAME TYPE
    // const gameChoice = playableGameTitles[2];
    const gameChoice = playableGameTitles[Math.floor(Math.random() * playableGameTitles.length)];

    const selectedGame = minigames.find(game => game.title === gameChoice)

    this.setState({ title: selectedGame.title });
    this.setState({ directions: selectedGame.directions });

    this.props.dispatch(setCurrentGame(gameChoice));
  }

  blindPlayPressed() {
    this.setState({displayBlind: false})
  }

  renderDirections() {
    if (this.state.displayBlind && (this.state.title === 'Trivia' || this.state.title === "Mimic the Dealer")) {
      return (
        <View>
          <GameMenu/>

          <Text style={[styles.title, styles.blindTitle]}>
            BLIND GAME!
          </Text>

          <Text style={styles.directions}>
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
          <GameMenu/>

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
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderDirections()}
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
