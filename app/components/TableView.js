import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import TableVisuals from './TableVisuals';

class TableView extends Component {
  constructor(props) {
     super(props);

     this.state = {
       highlightIdx: undefined
     }
  }

  render() {
    console.log(this.props.players)
    return (
      <View style={styles.container}>
        <TableVisuals
          playerCount={this.props.players.playerCount}
          onPlayerTouch={(playerIdx) => {
            this.setState({
              selectedPlayer: playerIdx
            });
          }}
          highlightIdx={this.state.selectedPlayer}
        />

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
    backgroundColor: 'white',
  },
  ready: {
    borderWidth:1,
    backgroundColor: 'lightgreen',
    overflow:'hidden', // doesn't work on Android??
    borderRadius: 5,
    padding: 5,
    marginTop: 20,
    fontSize: 25,
    color: 'black',
    textAlign: 'center',
  }
});

export default connect(({ players }) => ({ players }))(TableView);
