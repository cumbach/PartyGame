import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';

const WhiteDirections = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Welcome to React Native!
      </Text>

      <Text style={styles.instructions}>
        IOS:{'\n'}
        Press Cmd+R to reload,{'\n'}
        Cmd+D or shake for dev menu{'\n'}{'\n'}
        ANDROID:{'\n'}
        Double tap R on your keyboard to reload,{'\n'}
        Shake or press menu button for dev menu
      </Text>

      <Text
        style={styles.welcome}
        onPress={() => Actions.black()} // Actions.black refers to the key in the scene on index.js
      >
        Click here to flip
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  welcome: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: 'white',
    marginBottom: 5,
  },
});

export default WhiteDirections;
