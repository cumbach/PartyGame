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

class GameMenu extends Component {
  render() {
    return (
      <View style={styles.menu}>
        <Menu>
          <MenuTrigger>
            <Image
              source={require('../config/img/menu2.png')}
              style={{ width: 25, height: 25 }}
            />
          </MenuTrigger>
          <MenuOptions>
            <MenuOption
              onSelect={() => {
                Actions.playerNumber();
              }}
              text='Restart'
            />
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
    top: 10,
    left: 0
  }
});

export default GameMenu;
