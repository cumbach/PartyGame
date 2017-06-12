import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { minigames } from './config/data';
// import { increasePlayerCount } from './actions/players';
import { setCurrentGame } from './actions/gameActions';

class GamePlay extends Component {
  constructor(props) {
    super(props);
    this.state = { topic: '', subtopics:'' };
  }
  componentWillMount() {
    // Will need checks to make sure that unplayed games still exist
    var currentGameNumber = this.props.currentGame.currentGameNumber;
    var randomTopic = Math.floor(Math.random() * minigames[currentGameNumber].topics.length)

    this.setState({ topic: minigames[currentGameNumber].topics[randomTopic] })
    if (minigames[currentGameNumber].subtopics) {
      this.setState({ subtopic: minigames[currentGameNumber].subtopics[randomTopic] })
    }
  }
  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.topic}>
          {this.state.topic}
        </Text>

        <Text style={styles.subtopic}>
          {this.state.subtopic}
        </Text>


        <TouchableOpacity
          key='end'
          onPress={() => Actions.tableView()}>
          <Text style={styles.end}>Completed</Text>
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
  topic: {
    fontSize: 30,
    color: 'black',
    textAlign: 'center',
    margin: 10,
  },
  subtopic: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    margin: 10,
  },
  end: {
    borderWidth:1,
    backgroundColor: 'lightgreen',
    overflow:'hidden', // maybe doesn't work on Android??
    borderRadius: 5,
    padding: 10,
    marginTop: 0, //Needs adjusting
    fontSize: 34,
    color: 'black',
    textAlign: 'center',
    margin: 10,
  }

});

export default connect(({ currentGame }) => ({ currentGame }))(GamePlay);
