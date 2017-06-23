import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { minigames } from '../config/data';
import { setCurrentGame } from '../actions/gameActions';
import GameMenu from './GameMenu';

class GameTitle extends Component {
  constructor(props) {
    super(props);
    this.state = { title: '', directions: '' };
  }
  componentWillMount() {
    // Will need checks to make sure that unplayed games still exist
    var gameChoiceNumber = Math.floor(Math.random() * minigames.length)
    this.setState({ title: minigames[gameChoiceNumber].title })
    this.setState({ directions: minigames[gameChoiceNumber].directions})
    this.props.dispatch(setCurrentGame(gameChoiceNumber));
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
