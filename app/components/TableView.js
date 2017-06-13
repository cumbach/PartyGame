import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';

class TableView extends Component {
  constructor(props) {
     super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text
          style={styles.text}>
          All you Huan - Table View
        </Text>
        <TouchableOpacity
          key='ready'
          onPress={() => Actions.gameTitle()}>
          <Text style={styles.ready}>Ready!</Text>
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
    backgroundColor: 'black',
  },
  text: {
    fontSize: 40,
    color: 'white',
    textAlign: 'center',
    margin: 10,
  },
  ready: {
    borderWidth:1,
    backgroundColor: 'lightgreen',
    overflow:'hidden', // doesn't work on Android??
    borderRadius: 5,
    padding: 10,
    marginTop: 10, //Needs adjusting
    fontSize: 34,
    color: 'black',
    textAlign: 'center',
    margin: 10,
  }
});

export default TableView;
