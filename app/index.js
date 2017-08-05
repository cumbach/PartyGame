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
import GameDuration  from './components/GameDuration';
import TableView     from './components/TableView';
import GameTitle     from './components/GameTitle';
import TeamView      from './components/TeamView';
import DuelView      from './components/DuelView';
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
                type="reset"
              />

              <Scene
                key="playerSetup"
                component={PlayerSetup}
                hideNavBar
                type="reset"
              />

              <Scene
                key="gameDuration"
                component={GameDuration}
                hideNavBar
                type="reset"
              />

              <Scene
                key="tableView"
                component={TableView}
                hideNavBar
                type="reset"
              />

              <Scene
                key="gameTitle"
                component={GameTitle}
                hideNavBar
                type="reset"
              />

              <Scene
                key="teamView"
                component={TeamView}
                hideNavBar
                type="reset"
              />

              <Scene
                key="duelView"
                component={DuelView}
                hideNavBar
                type="reset"
              />

              <Scene
                key="gamePlay"
                component={GamePlay}
                hideNavBar
                type="reset"
              />

            </Scene>
          </RouterWithRedux>
        </Provider>
      </MenuContext>
    )
  }
}

export default App;
