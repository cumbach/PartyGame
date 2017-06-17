import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { minigames } from '../config/data';
import {
  setCurrentGame,
  shiftPlayerOrder,
  shiftTableState,
  winnerSelected,
  loserSelected
} from '../actions/gameActions';

import TableVisuals from './TableVisuals';

class TableView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPlayerIdx: undefined,
      spinValue: new Animated.Value(0)
    }

  }

  componentWillMount() {
    if (this.props.currentGame.tableState === 'new') {
      this.setState({ selectedPlayerIdx: 0 })
    }
  }

  completeGame() {
    var duration = 1000;
    this.startCompleteAnimation(duration);

    setTimeout(() => {
      this.handleScoreChange();
      this.props.dispatch(shiftPlayerOrder());
      this.setState({ selectedPlayerIdx: undefined });
      this.props.dispatch(shiftTableState('new'));
      this.setState({ selectedPlayerIdx: 0 })
    }, duration);
  }

  startCompleteAnimation(duration) {
    Animated.timing(
      this.state.spinValue,
      {
        toValue: 1,
        duration: duration,
      }
    ).start();
  }

  handleScoreChange() {
    const gameType = minigames[this.props.currentGame.currentGameNumber].completed;
    if (gameType === 'Winning') {
      this.props.dispatch(winnerSelected(this.props.players.playerOrder[this.state.selectedPlayerIdx]))
    } else if (gameType === 'Losing') {
      this.props.dispatch(loserSelected(this.props.players.playerOrder[this.state.selectedPlayerIdx]))
    }
  }

  renderCompleteGame() {
    return (
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          Select the {minigames[this.props.currentGame.currentGameNumber].completed} Color
        </Text>

        <TouchableOpacity
          key='next'
          disabled={this.state.selectedPlayerIdx == undefined}
          onPress={() => this.completeGame()}>
          <Text style={styles.button}>Next</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderNextGame() {
    return (
      <View style={styles.textContainer}>
        <TouchableOpacity
          key='ready'
          onPress={() => Actions.gameTitle()}>
          <Text style={styles.button}>Ready!</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderTableActions(tableState) {
    if (tableState === 'new') {
      return this.renderNextGame();
    } else if (tableState === 'complete') {
      return this.renderCompleteGame();
    }

    return undefined
  }

  render() {
    const tableState = this.props.currentGame.tableState;
    const playerCount = this.props.players.playerCount

    const spinDegrees = '-' + String(360 / playerCount) + 'deg';
    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', spinDegrees]
    });

    return (
      <View style={styles.container}>
        <TableVisuals
          spin={tableState === 'new' ? '0deg' : spin }
          style={styles.table}
          playerCount={playerCount}
          onPlayerTouch={(playerIdx) => {
            if (tableState === 'complete') {
              this.setState({
                selectedPlayerIdx: playerIdx
              });
            }

            return undefined;
          }}
          tableState={tableState}
          highlightIdx={this.state.selectedPlayerIdx}
          playerOrder={this.props.players.playerOrder}
          playerScores={this.props.players.playerScores}
        />

        {this.renderTableActions(tableState)}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row'
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    color: 'black',
    textAlign: 'center',
    marginBottom: 20
  },
  button: {
    borderWidth:1,
    backgroundColor: 'lightgreen',
    overflow:'hidden', // doesn't work on Android??
    borderRadius: 5,
    padding: 10,
    marginTop: 0, //Needs adjusting
    fontSize: 34,
    color: 'black',
    textAlign: 'center',
    margin: 10
  },

});

export default connect(({ currentGame, players }) => ({ currentGame, players }))(TableView);
