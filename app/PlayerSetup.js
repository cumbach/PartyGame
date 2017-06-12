import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { colors } from './config/data';
import { increasePlayerCount } from './actions/gameActions';

class PlayerSetup extends Component {
  constructor(props) {
    super(props);
    this.state = { buttonColor: '#fff' };
  }
  circleTouched() {
    if (this.props.players.playerCount < 9) {
      this.setState({ buttonColor: colors[this.props.players.playerCount]});
      this.props.dispatch(increasePlayerCount());
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          key='circle'
          onPress={this.circleTouched.bind(this)}
          style={[{backgroundColor:this.state.buttonColor}, styles.circle]}>
        </TouchableOpacity>

        <Text style={styles.directions}>
          PASS THE PHONE AROUND TO EACH PLAYER{'\n'}{'\n'}
          HAVE EVERYONE TOUCH THE PHONE TO RECEIVE A COLOR
        </Text>

        <TouchableOpacity
          key='done'
          onPress={() => Actions.tableView()}>
          <Text style={styles.done}>Done</Text>
        </TouchableOpacity>


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
  done: {
    borderWidth:1,
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

export default connect(({ players }) => ({ players }))(PlayerSetup);
