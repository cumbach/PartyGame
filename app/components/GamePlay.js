import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { shiftTableState, topicSelected } from '../actions/gameActions';
import GameMenu from './GameMenu';

class GamePlay extends Component {
  constructor(props) {
    super(props);
    this.state = { topic: '', subtopics:'' };
  }

  componentWillMount() {
    const playableGames = this.props.currentGame.playableGames
    const topics = playableGames[this.props.currentGame.currentGame];

    const randomTopicNumber = Math.floor(Math.random() * topics.length);
    const randomTopic = topics[randomTopicNumber];

    this.setState({ topic: randomTopic[0] });

    if (randomTopic[1]) {
      this.setState({ subtopic: randomTopic[1] });
    }

    this.props.dispatch(topicSelected(randomTopicNumber));
  }

  render() {
    return (
      <View style={styles.container}>
        <GameMenu />

        <Text style={styles.topic}>
          {this.state.topic}
        </Text>

        <Text style={styles.subtopic}>
          {this.state.subtopic}
        </Text>


        <TouchableOpacity
          key='end'
          onPress={() => {
            this.props.dispatch(shiftTableState('complete'));
            Actions.tableView();
          }}
        >
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
    marginBottom: 10,
  },
  subtopic: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    marginBottom: 30,

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
