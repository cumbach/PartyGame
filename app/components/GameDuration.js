import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { duration } from '../config/data';

import { setGameDuration  } from '../actions/gameActions';

import GameMenu from './GameMenu';

class GameDuration extends Component {
  constructor(props) {
    super(props);
    this.state = { highlightIdx: null };
  }

  completeDurationSelection() {
    if (this.state.highlightIdx != null) {
      var selectedDuration = duration[Object.keys(duration)[this.state.highlightIdx]]
      this.props.dispatch(setGameDuration(selectedDuration));
      Actions.tableView();
    }
  }

  durationTouch(idx) {
    this.setState({ highlightIdx:idx });
  }

  shouldHighlight(idx){
    return this.state.highlightIdx === idx;
  }

  render() {
    return (
      <View style={styles.container}>
        <GameMenu />

        <Text style={styles.directions}>
          SELECT THE GAME DURATION
        </Text>

        <View style={styles.numbersContainer}>
        {
          Object.keys(duration).map((duration, idx) => {
            return (
                <TouchableOpacity
                  key={`Player${idx + 1}`}
                  onPress={() => this.durationTouch(idx)}
                  style={[{
                    backgroundColor: this.shouldHighlight(idx) ? 'green' : 'goldenrod',
                  }, styles.numberBlock]}
                >
                  <Text style={styles.numbers}>
                    {duration}
                  </Text>
                </TouchableOpacity>
            )
          })
        }
        </View>


        <TouchableOpacity
          key='done'
          onPress={() => {
            this.completeDurationSelection()
          }}
        >
          <Text style={styles.done}>Done</Text>
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
    marginTop: 10,
  },
  numbersContainer: {
    flexWrap: 'wrap',
    flex: 1,
  },
  numberBlock: {
    justifyContent: 'center',
    borderRadius: 6,
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.4)',
    margin: 10,
    width: 140,
    height: 45,
  },
  numbers: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    margin: 5,
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

export default connect(({ currentGame }) => ({ currentGame }))(GameDuration);
