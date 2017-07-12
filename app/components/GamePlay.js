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
import GameSettings from './GameSettings';

class GamePlay extends Component {
  constructor(props) {
    super(props);
    this.state = { topic: '', subtopics:'' };
  }

  componentWillMount() {
    this.createGameTopic();
  }

  createGameTopic(){
    const playableGames = this.props.currentGame.playableGames;
    this.topics = playableGames[this.props.currentGame.currentGame];

    const rndNum = Math.floor(Math.random() * this.topics.length);
    const randomTopic = this.topics[rndNum];

    // check if multipleChoices enabled for title
    if (randomTopic[2]) {
      this.setState({ topic: [this.topics[rndNum], this.topics[(rndNum+1)%this.topics.length], this.topics[(rndNum+2)%this.topics.length], ["Create your Own"]] })
      this.randomNum = rndNum;

    } else {

      this.setState({ topic: [randomTopic[0]] });
      this.enableCompleteButton = true;
      if (randomTopic[1]) {
        this.setState({ subtopic: randomTopic[1] });
      }
      this.props.dispatch(topicSelected(rndNum));
    }
  }

  renderSkipButton(){
    if (this.props.currentGame.currentGame === 'Trivia') {
      return <TouchableOpacity
        key='skip'
        onPress={() => {this.createGameTopic()}}>
        <Text style={styles.end}>Skip Question ></Text>
      </TouchableOpacity>
    }
  }
  selectTopic(topic, idx) {
    this.setState({ topic: topic[0] })

    // doesnt dispatch for "Create your own"
    if (idx != 3) {
      this.props.dispatch(topicSelected((this.randomNum + idx) % this.topics.length));
    }
    this.enableCompleteButton = true;
  }

  renderTopic() {

    // Some games, like Categories, have multiple choices for topics
    if (typeof this.state.topic === 'object' && this.state.topic.length > 1) {
      return this.state.topic.map((topic, idx) => {
        return (
          <TouchableOpacity
            key={'choice' + idx}
            onPress={() => {
              this.selectTopic(topic, idx);
            }}
          >
            <Text style={styles.choice}>{topic[0]}</Text>
          </TouchableOpacity>
        )
      })

    } else {

      return (
        <Text style={styles.topic}>
          {this.state.topic}
        </Text>
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <GameMenu />
        <GameSettings />

        {this.renderTopic()}

        <Text style={styles.subtopic}>
          {this.state.subtopic}
        </Text>

        {this.renderSkipButton()}

        <TouchableOpacity
          key='end'
          onPress={() => {
            this.props.dispatch(shiftTableState('complete'));
            Actions.tableView();
          }}
        >
          <Text style={[{
              display: this.enableCompleteButton ? 'flex' : 'none'
              }, styles.end]}>Completed
          </Text>
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
  skip: {
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
  },
  choice: {
    borderWidth:1,
    backgroundColor: '#9BACFF',
    overflow:'hidden', // maybe doesn't work on Android??
    borderRadius: 5,
    width: 400,
    padding: 10,
    marginTop: 0, //Needs adjusting
    fontSize: 34,
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
