import React, { Component } from 'react';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { minigames } from '../config/data';
import { removeGameType, addGameType } from '../actions/gameActions';

class GameSettings extends Component {
  constructor(props) {
    super(props);
  }
  showAllGames() {
    const playableGames = this.props.currentGame.playableGames;
    const removedGames = this.props.currentGame.removedGames;
    const allGames = {};
    for (key in playableGames) {
      allGames[key] = playableGames[key];
    }
    for (key in removedGames) {
      allGames[key] = removedGames[key];
    }

    return Object.keys(allGames).map(function(gameType, idx){
      if (removedGames[gameType]) {
        return (
          <MenuOption
            key={gameType}
            style={{ backgroundColor: 'red' }}
            onSelect={() => {
              this.addGame(gameType);
            }}
            text={gameType}
            />
        )
      } else {
        return(
          <MenuOption
            key={gameType}
            style={{ backgroundColor: 'green' }}
            onSelect={() => {
              this.removeGame(gameType);
            }}
            text={gameType}
            />
        )
      }
    }.bind(this))
  }
  removeGame(gameType) {
    // var removed = this.props.currentGame.removedGames;
    // removed[gameType] = this.props.currentGame.playableGames[gameType];
    // this.setState({ "removedGames": removed });
    this.props.dispatch(removeGameType(gameType))
  }
  addGame(gameType) {
    // var removed = this.props.currentGame.removedGames;
    this.props.dispatch(addGameType(gameType))
    // delete removed[gameType];
    // this.setState({ "removedGames": removed });
  }
  render() {
    return (
      <View style={styles.menu}>
        <Menu>
          <MenuTrigger>
            <Image
              source={require('../config/img/gear.png')}
              style={{ width: 40, height: 40, zIndex: 2 }}
            />
          </MenuTrigger>
          <MenuOptions>
            {this.showAllGames()}
          </MenuOptions>
        </Menu>
        { this.props.children }
      </View>
    )
  }
};

const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    top: 5,
    right: 0
  }
});

export default connect(({ currentGame }) => ({ currentGame }))(GameSettings);
