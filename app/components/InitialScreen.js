import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

class InitialScreen extends Component {
  render() {
    return (
      <View style={styles.container}>

        <TouchableOpacity
          key='newGame'
          onPress={() => Actions.playerNumber()}>
          <Text style={styles.newGame}>New Game</Text>
        </TouchableOpacity>

      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  newGame: {
    borderWidth:2,
    borderColor: 'rgba(0,0,0,0.4)',
    backgroundColor: 'lightgreen',
    overflow:'hidden', // doesn't work on Android??
    borderRadius: 5,
    padding: 10,
    marginTop: 0, //Needs adjusting
    fontSize: 34,
    color: 'black',
    textAlign: 'center',
    margin: 10,
  }
});

export default InitialScreen;
