import React, { Component } from 'react';
import _ from 'lodash';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Animated
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import SimpleStepper from 'react-native-simple-stepper';

import { minigames } from '../config/data';
import {
  shiftTableState,
  winnersSelected,
  setTeams,
  shiftPlayerOrder,
  selectDuelOpponentIdx,
  selectDuelValue,
  duelWinnerSelected
} from '../actions/gameActions';

import TableVisuals from './TableVisuals';
import GameMenu from './GameMenu';
import GameSettings from './GameSettings';

class DuelView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPlayerIdx: undefined,
      spinValue: new Animated.Value(0),
      duelValue: 0
    };
  }

  renderNextButton() {
    if (this.props.currentGame.tableState === 'new') {
      return (
        <TouchableOpacity
          key='duel'
          onPress={() => {
            this.props.dispatch(selectDuelOpponentIdx(this.state.selectedPlayerIdx));
            this.props.dispatch(selectDuelValue(this.state.duelValue || 10));
            this.setState({ selectedPlayerIdx: undefined });

            Actions.gamePlay();
          }}
          disabled={this.state.selectedPlayerIdx == undefined}
        >
          <Text style={styles.button}>Challenge Someone to a Duel!</Text>
        </TouchableOpacity>
      )
    } else if (this.props.currentGame.tableState === 'complete') {
      return (
        <TouchableOpacity
          key='complete'
          onPress={() => this.completeGame()}
          disabled={this.state.selectedPlayerIdx == undefined}
        >
          <Text style={styles.start}>Pick Duel Winner</Text>
        </TouchableOpacity>
      )
    }
  }

  completeGame() {
    var duration = 1000;
    this.startCompleteAnimation(duration);

    setTimeout(() => {
      const playerOrder = this.props.players.playerOrder;
      const winner = playerOrder[this.state.selectedPlayerIdx];
      const loser = this.state.selectedPlayerIdx === 0 ?
        playerOrder[this.props.players.duelOpponentIdx] : playerOrder[0];

      this.props.dispatch(duelWinnerSelected([winner, loser]));
      this.props.dispatch(shiftPlayerOrder());
      this.props.dispatch(shiftTableState('new'));
      this.setState({ selectedPlayerIdx: undefined });

      Actions.tableView();
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

  disabledPlayers() {
    if (this.props.currentGame.tableState === 'new') {
      return [0];
    } else if (this.props.currentGame.tableState === 'complete') {
      const playerList = _.range(0, this.props.players.playerCount);

      playerList.splice(this.props.players.duelOpponentIdx, 1);
      playerList.splice(0, 1);

      return playerList;
    }
  }

  maxDuelValue() {
    const duelIdx = this.state.selectedPlayerIdx;
    const playerIdx = 0;
    const playerScores = this.props.players.playerScores;
    const playerOrder = this.props.players.playerOrder;

    return Math.min(playerScores[playerOrder[duelIdx]], playerScores[playerOrder[playerIdx]]);
  }

  render() {
    const tableState = this.props.currentGame.tableState;
    const spinDegrees = '-' + String(360 / this.props.players.playerCount) + 'deg';
    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', spinDegrees]
    });

    return (
      <View style={styles.container}>
        <GameMenu />
        <GameSettings />

        <TableVisuals
          spin={tableState === 'new' ? '0deg' : spin}
          playerCount={this.props.players.playerCount}
          onPlayerTouch={(playerIdx) => {
            this.setState({
              selectedPlayerIdx: playerIdx
            });
          }}
          tableState={tableState}
          highlightIdx={this.state.selectedPlayerIdx}
          playerOrder={this.props.players.playerOrder}
          playerScores={this.props.players.playerScores}
          disabledPlayers={this.disabledPlayers()}
        />

        {
          this.maxDuelValue() > 0 && this.props.currentGame.tableState === 'new' ?
            <View>
              <Text>
                {`Bet points: ${this.state.duelValue}`}
              </Text>
              <SimpleStepper
                intialValue={0}
                stepValue={10}
                maximumValue={this.maxDuelValue()}
                valueChanged={value => this.setState({ duelValue: value })}
              />
            </View> :
            undefined
        }

        <View style={styles.textContainer}>
          {this.renderNextButton()}
        </View>
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
    alignItems: 'center'
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
    margin: 10
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
  }
});

export default connect(({ currentGame, players }) => ({ currentGame, players }))(DuelView);
