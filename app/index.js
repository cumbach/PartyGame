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
import { Router, Scene } from 'react-native-router-flux';
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
          initial
        />

        <Scene
          key="black"
          component={BlackDirections}
          title="Black Title"
        />

      </Scene>
    </Router>
  )
  return <WhiteDirections />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default App;
