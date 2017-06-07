import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  // TouchableHighlight,
  // Image,
  TouchableOpacity,
  // Icon,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';

class PlayerSetup extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.circle}></TouchableOpacity>

        <Text style={styles.directions}>
          PASS THE PHONE AROUND TO EACH PLAYER{'\n'}{'\n'}
          HAVE EVERYONE TOUCH THE PHONE TO RECEIVE A COLOR
        </Text>

        <Text
          style={styles.begin}
          onPress={() => Actions.tableView()} // Actions.table refers to the key
        >
          Begin!
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  circle: {
    borderWidth:2,
    borderColor:'rgba(0,0,0,0.4)',
    alignItems:'center',
    justifyContent:'center',
    width:100,
    height:100,
    backgroundColor:'#fff',
    borderRadius:100,
    marginBottom: 0 //Needs adjusting
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  directions: {
    fontSize: 22,
    color: 'black',
    textAlign: 'center',
    margin: 10,
  },
  begin: {
    borderWidth:1,
    backgroundColor: 'lightgreen',
    borderRadius: 5,
    padding: 10,
    marginTop: 0, //Needs adjusting
    fontSize: 34,
    color: 'black',
    textAlign: 'center',
    margin: 10,
  }

});

export default PlayerSetup;
