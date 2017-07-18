import React, { Component } from 'react';
import _ from 'lodash';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { minigames } from '../config/data';
import {
  shiftTableState,
  winnersSelected,
  setTeams,
  shiftPlayerOrder
} from '../actions/gameActions';

import TableVisuals from './TableVisuals';
import GameMenu from './GameMenu';
import GameSettings from './GameSettings';

class TeamView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTeam: undefined
    };
  }

  componentWillMount() {
    if (this.props.currentGame.tableState === 'new') {
      const teams = this.assignTeams();
      this.props.dispatch(setTeams(teams));
    }
  }

  assignTeams() {
    const playerCount = this.props.players.playerCount;
    const teamOneCount = Math.ceil(playerCount / 2);
    const teamOneEnd = Math.floor(Math.random() * (teamOneCount - 1)) + 1;

    let teamOneRange = _.range(0, teamOneEnd + 1);
    const leftOverCount = teamOneCount - teamOneRange.length;
    teamOneRange.unshift(_.range(playerCount - leftOverCount, playerCount));
    teamOneRange = _.flatten(teamOneRange);
    const teamTwoEnd = _.first(teamOneRange) === 0 ? playerCount - 1 : _.first(teamOneRange) - 1;
    const teamTwoRange = _.range(_.last(teamOneRange) + 1, teamTwoEnd + 1);

    return {
      one: teamOneRange,
      two: teamTwoRange
    };
  }

  renderTeam(team, num) {
    const tableState = this.props.currentGame.tableState;

    if (tableState === 'new') {
      return (
        <View>
          {this.renderTeamCircles(team, num)}
        </View>
      )
    } else if (tableState === 'complete') {
      return (
        <View style={{ backgroundColor: num === this.state.selectedTeam ? 'lightyellow' : 'white' }}>
          <TouchableOpacity
            onPress={() => this.setState({ selectedTeam: num })}
          >
            {this.renderTeamCircles(team, num)}
          </TouchableOpacity>
        </View>
      )
    }
  }

  renderTeamCircles(team, num) {
    const playerOrder = this.props.players.playerOrder;

    return (
      <View>
        <Text>{`Team ${num}`}</Text>
        {team.map((idx) => {
          return <View key={idx} style={[{ backgroundColor: playerOrder[idx] }, styles.circle]} />
        })}
      </View>
    );
  }

  renderNextButton() {
    if (this.props.currentGame.tableState === 'new') {
      return (
        <TouchableOpacity
          key='start'
          onPress={() => Actions.gamePlay()}>
          <Text style={styles.start}>Start!</Text>
        </TouchableOpacity>
      )
    } else if (this.props.currentGame.tableState === 'complete') {
      return (
        <TouchableOpacity
          key='complete'
          onPress={() => {
            const winners = this.props.currentGame.teams[this.state.selectedTeam].map((playerIdx) => {
              return this.props.players.playerOrder[playerIdx];
            });

            this.props.dispatch(winnersSelected(winners));
            this.props.dispatch(shiftPlayerOrder());
            this.props.dispatch(shiftTableState('new'));
            this.setState({ selectedTeam: undefined });
            Actions.tableView();
          }}
          disabled={!this.state.selectedTeam}
        >
          <Text style={styles.start}>Pick Winning Team</Text>
        </TouchableOpacity>
      )
    }
  }

  render() {
    const teams = this.props.currentGame.teams;
    if (!Object.keys(teams).length) return null;

    const tableState = this.props.currentGame.tableState;

    return (
      <View style={styles.container}>
        <GameMenu />
        <GameSettings />

        <View style={styles.teamsContainer}>
          {this.renderTeam(teams.one, 'one')}
          <Text>VS</Text>
          {this.renderTeam(teams.two, 'two')}
        </View>

        {this.renderNextButton()}
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
    flexDirection: 'column'
  },
  teamsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  circle: {
    borderWidth: 2,
    borderColor:'rgba(0,0,0,0.4)',
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 20,
    height: 60,
    width: 60,
    margin: 10
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
  }
});

export default connect(({ currentGame, players }) => ({ currentGame, players }))(TeamView);
