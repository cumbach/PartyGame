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
import InitialScreen from './InitialScreen';
import PlayerSetup from './PlayerSetup';
import Orientation from 'react-native-orientation';

class App extends Component {
  componentWillMount(){
    var next = Orientation.lockToLandscape();
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
            hideNavBar
          />

        </Scene>
      </Router>
    )
  }
}

export default App;
