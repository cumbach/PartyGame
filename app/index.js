console.ignoredYellowBox = ['Warning: BackAndroid is deprecated', 'Remote debugger']; // removes warnings

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  // TouchableHighlight,
  // Image,
  // TouchableOpacity,
  // Icon,
} from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import Orientation from 'react-native-orientation';
import { connect, Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { MenuContext } from 'react-native-popup-menu';

import reducers from './reducers';
import InitialScreen from './components/InitialScreen';
import PlayerNumber   from './components/PlayerNumber';
import PlayerSetup   from './components/PlayerSetup';
import TableView     from './components/TableView';
import GameTitle     from './components/GameTitle';
import GamePlay      from './components/GamePlay';
import GameSettings  from './components/GameSettings';


const RouterWithRedux = connect()(Router);

const middleware = [thunk];
const store = compose(
  applyMiddleware(...middleware)
)(createStore)(reducers);

class App extends Component {
  componentWillMount(){
    Orientation.lockToLandscape();
  }
  render() {
    return (
      <MenuContext>
        <Provider store={store}>
          <RouterWithRedux>
            <Scene key="root">
              <Scene
                key="initial"
                component={InitialScreen}
                title="Party Game"
                initial // This sets InitialScreen as the initial screen
              />

              <Scene
                key="playerNumber"
                component={PlayerNumber}
                hideNavBar
              />

              <Scene
                key="playerSetup"
                component={PlayerSetup}
                hideNavBar
              />

              <Scene
                key="tableView"
                component={TableView}
                hideNavBar
              />

              <Scene
                key="gameTitle"
                component={GameTitle}
                hideNavBar
              />

              <Scene
                key="gamePlay"
                component={GamePlay}
                hideNavBar
              />

            </Scene>
          </RouterWithRedux>
        </Provider>
      </MenuContext>
    )
  }
}

export default App;
