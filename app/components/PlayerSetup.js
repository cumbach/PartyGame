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
import { increaseSelectedCount, setPlayerScores, setPlayerOrder  } from '../actions/gameActions';

class PlayerSetup extends Component {
  constructor(props) {
    super(props);
    this.state = { playersArray: [] };
  }

  completePlayerSetup() {
    const playerScores = {};
    this.state.playersArray.forEach((color, idx) => {
      playerScores[color] = 0;
    })

    this.props.dispatch(setPlayerScores(playerScores));
    this.props.dispatch(setPlayerOrder(this.state.playersArray));
    Actions.tableView();
  }

  numberTouch(color){
    if (this.state.playersArray.indexOf(color) === -1 &&
        this.state.playersArray.length < this.props.players.playerCount) {
      this.state.playersArray.push(color);
      this.setState({ playersArray: this.state.playersArray });
      this.props.dispatch(increaseSelectedCount())
    }
  }

  numberChosen() {
    return this.props.players.playerCount === this.state.playersArray.length
  }

  circleColor(color) {
    return this.state.playersArray.indexOf(color) != -1 ? 'white' : color
  }

  borderColor(color) {
    return this.state.playersArray.indexOf(color) != -1 ? 'white' : 'rgba(0,0,0,0.4)'
  }

  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.directions}>
          PASS THE PHONE AROUND TO CHOOSE YOUR COLOR
        </Text>

        <View style={styles.colorsContainer}>
        {
          colors.map((color, idx) => {
            return (
                <TouchableOpacity
                  key={`Select${idx + 1}`}
                  onPress={() => this.numberTouch(color)}
                  style={[{
                    backgroundColor: this.circleColor(color),
                    borderColor: this.borderColor(color)
                  }, styles.colorCircle]}
                >
                </TouchableOpacity>
            )
          })
        }
        </View>

        <TouchableOpacity
          key='done'
          onPress={() => {
            this.completePlayerSetup()
          }}
        >
          <Text
            style={[{
              display: this.numberChosen() ? 'flex' : 'none'
            }, styles.done]}
          >Done</Text>
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
    fontSize: 22,
    color: 'black',
    textAlign: 'center',
    margin: 10,
  },
  colorsContainer: {
    flexWrap: 'wrap',
    flex: 1,
  },
  colorCircle: {
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 2,
    margin: 10,
    width: 100,
    height: 100,
  },
  done: {
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

export default connect(({ players }) => ({ players }))(PlayerSetup);
