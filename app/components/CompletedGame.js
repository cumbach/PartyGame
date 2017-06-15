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

import TableVisuals from './TableVisuals';


class CompletedGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      highlightIdx: undefined
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <TableVisuals
          playerCount={this.props.players.playerCount}
          onPlayerTouch={(playerIdx) => {
            this.setState({
              selectedPlayer: playerIdx
            });
          }}
          highlightIdx={this.state.selectedPlayer}
        />
      
        <Text style={styles.title}>
          Select the {minigames[this.props.currentGame.currentGameNumber].completed} of this Game
        </Text>

        <TouchableOpacity
          key='next'
          onPress={() => Actions.tableView()}>
          <Text style={styles.next}>Next</Text>
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
  next: {
    borderWidth:1,
    backgroundColor: 'lightgreen',
    overflow:'hidden', // doesn't work on Android??
    borderRadius: 5,
    padding: 10,
    marginTop: 0, //Needs adjusting
    fontSize: 34,
    color: 'black',
    textAlign: 'center',
    margin: 10,
  }

});

export default connect(({ currentGame, players }) => ({ currentGame, players }))(CompletedGame);
