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
       viewHeight: undefined,
       viewWidth: undefined,
       highlightIdx: undefined
     }
  }

  render() {
    return (
      <View
        style={styles.container}
        onLayout={(event) => {
          const { width, height } = event.nativeEvent.layout;
          this.setState({ viewWidth: width, viewHeight: height })
        }}
      >
        {
          this.state.viewHeight && this.state.viewWidth ?
            <TableVisuals
              playerCount={this.props.players.playerCount}
              viewHeight={this.state.viewHeight}
              viewWidth={this.state.viewWidth}
              onPlayerTouch={(playerIdx) => {
                this.setState({
                  selectedPlayer: playerIdx
                });
              }}
              highlightIdx={this.state.selectedPlayer}
            /> :
            undefined
        }
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
    position: 'absolute',
    bottom: 10,
    left: -40,
    borderWidth:1,
    backgroundColor: 'lightgreen',
    overflow:'hidden', // doesn't work on Android??
    borderRadius: 5,
    padding: 5,
    marginTop: 5,
    fontSize: 25,
    color: 'black',
    textAlign: 'center',
    left: -50, // Take out when positioning working correctly
    margin: 5
  }
});

export default connect(({ players }) => ({ players }))(TableView);
