/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Router, Scene, ActionConst } from 'react-native-router-flux';
import Orientation from 'react-native-orientation';

// Views
import InitialScreen from './InitialScreen';
import PlayerSetup from './PlayerSetup';
import TableView from './TableView';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { numberOfPlayers: 0 };
  }
  componentWillMount(){
    var next = Orientation.lockToLandscape();
  }
  increasePlayers() {
    this.setState({ numberOfPlayers: this.state.numberOfPlayers + 1})
    // IT LOOKS LIKE IT'S WORKING CORRECTLY BUT ACTUALLY ISN'T (SEE CONSOLE LOGS ON BEGIN)
    console.log(this.state.numberOfPlayers);
  }
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene
            key="initial"
            component={InitialScreen}
            title="Party Game"
            initial // This sets InitialScreen as the initial screen
          />

          <Scene
            key="playerSetup"
            component={PlayerSetup}
            numberOfPlayers={this.state.numberOfPlayers}
            increasePlayers={this.increasePlayers.bind(this)}
            hideNavBar
          />

          <Scene
            key="tableView"
            component={TableView}
            numberOfPlayers={this.state.numberOfPlayers} // THE STATE NEVER ACTUALLY RESETS HERE
            hideNavBar
          />

        </Scene>
      </Router>
    )
  }
}

export default App;
