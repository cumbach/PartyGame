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
import WhiteDirections from './WhiteDirections';
import BlackDirections from './BlackDirections';

const App = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene
          key="white"
          component={WhiteDirections}
          title="White Title"
          type={ActionConst.RESET}
          initial
        />

        <Scene
          key="black"
          component={BlackDirections}
          type={ActionConst.RESET}
          title="Black Title"
        />

      </Scene>
    </Router>
  )
  return <WhiteDirections />;
}

export default App;
