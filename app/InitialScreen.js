import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';

class InitialScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text
          style={styles.text}
          onPress={() => Actions.playerSetup()} // Actions.playerSetup refers to the key in the scene on index.js
        >
          Play!
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  text: {
    fontSize: 40,
    color: 'white',
    textAlign: 'center',
    margin: 10,
  },
});

export default InitialScreen;
