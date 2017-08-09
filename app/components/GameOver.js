import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { colors } from '../config/data';
// import { setPlayerScores, setPlayerOrder  } from '../actions/gameActions';

import GameMenu from './GameMenu';

class PlayerSetup extends Component {
  constructor(props) {
    super(props);
  }

  winningColor() {
    // THIS LOGIC ONLY GRABS ONE WINNER AND WONT TAKE TIES INTO ACCOUNT

    var winningColor = '';
    var winningScore = 0;
    var scores = this.props.players.playerScores;
    Object.keys(scores).forEach(function(color){
      if (scores[color] > winningScore) {
        winningColor = color;
        winningScore = scores[color];
      }
    })

    return winningColor;
  }

  render() {
    return (
      <View style={styles.container}>
        <GameMenu />

        <Text style={styles.directions}>
          GAME OVER
        </Text>

        <Text style={styles.directions}>
          WINNER:
        </Text>

        <TouchableOpacity
          key='winner'
          style={[{
            backgroundColor: this.winningColor()
          }, styles.colorCircle]}
        >
        </TouchableOpacity>

        <TouchableOpacity
          key='reset'
          onPress={() => {
            Actions.playerNumber()
          }}
        >
          <Text
            style={styles.restart}
          >Start New Game</Text>
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
  directions: {
    fontSize: 28,
    color: 'black',
    textAlign: 'center',
    margin: 10,
  },
  colorCircle: {
    borderColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 2,
    margin: 10,
    width: 100,
    height: 100,
  },
  restart: {
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

export default connect(({ players, currentGame }) => ({ players, currentGame }))(PlayerSetup);
