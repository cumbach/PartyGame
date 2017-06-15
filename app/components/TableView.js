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
      selectedPlayerIdx: undefined
    }
  }

  completeGame() {
    this.handleScoreChange();
    this.props.dispatch(shiftPlayerOrder());
    this.setState({ selectedPlayerIdx: undefined });
    this.props.dispatch(shiftTableState('new'));
  }

  handleScoreChange() {
    const gameType = minigames[this.props.currentGame.currentGameNumber].completed;
    if (gameType === 'Winner') {
      this.props.dispatch(winnerSelected(this.props.players.playerOrder[this.state.selectedPlayerIdx]))
    } else if (gameType === 'Loser') {
      this.props.dispatch(loserSelected(this.props.players.playerOrder[this.state.selectedPlayerIdx]))
    }
  }

  renderCompleteGame() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Select the {minigames[this.props.currentGame.currentGameNumber].completed} of this Game
        </Text>

        <TouchableOpacity
          key='next'
          disabled={this.state.selectedPlayerIdx == undefined}
          onPress={() => this.completeGame()}>
          <Text style={styles.next}>Next</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderNextGame() {
    return (
      <TouchableOpacity
        key='ready'
        onPress={() => Actions.gameTitle()}>
        <Text style={styles.ready}>Ready!</Text>
      </TouchableOpacity>
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

    return (
      <View style={styles.container}>
        <TableVisuals
          playerCount={this.props.players.playerCount}
          onPlayerTouch={(playerIdx) => {
            if (tableState === 'complete') {
              this.setState({
                selectedPlayerIdx: playerIdx
              });
            }

            return undefined;
          }}
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
    margin: 10
  },
  ready: {
    borderWidth:1,
    backgroundColor: 'lightgreen',
    overflow:'hidden', // doesn't work on Android??
    borderRadius: 5,
    padding: 5,
    marginTop: 20,
    fontSize: 25,
    color: 'black',
    textAlign: 'center',
  }
});

export default connect(({ currentGame, players }) => ({ currentGame, players }))(TableView);
