import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
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
          All you Huan
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

export default TableView;