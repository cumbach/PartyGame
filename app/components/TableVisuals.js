import React, { Component } from 'react';
import _ from 'lodash';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Image
} from 'react-native';
import { Platform, ART } from 'react-native'
const { Surface, Shape, Path, Group } = ART

class TableVisuals extends Component {
  constructor(props) {
     super(props);
     this.state = {
       chevronPosition: new Animated.Value(0)
     }

  }
  componentDidMount() {
    this.animateChevron();
  }

  animateChevron(){
    Animated.sequence([
      Animated.timing(this.state.chevronPosition, {
        toValue: -15,
        duration: 700,
      }),
      Animated.timing(this.state.chevronPosition, {
        toValue: 0,
        duration: 700
     })
    ]).start(event => {
      if (event.finished) {
        this.animateChevron();
      }
    });
  }

  createPath(cx, cy, r, startAngle, arcAngle) {
    const p = new Path()
    if (Platform.OS === 'ios') {
      p.path.push(0, cx + r * Math.cos(startAngle), cy + r * Math.sin(startAngle))
      p.path.push(4, cx, cy, r, startAngle, startAngle + arcAngle, 1)
    } else {
      // For Android we have to resort to drawing low-level Path primitives, as ART does not support
      // arbitrary circle segments. It also does not support strokeDash.
      // Furthermore, the ART implementation seems to be buggy/different than the iOS one.
      // MoveTo is not needed on Android
      p.path.push(4, cx, cy, r, startAngle, startAngle - arcAngle, 0)
    }
    return p
  }
  getPlayerSize(playerCount) {
    if (playerCount <= 4) {
      return 95;
    } else if (playerCount <= 7) {
      return 80;
    } else {
      return 70;
    }
  }

  shouldHighlight(idx) {
    return idx === this.props.highlightIdx;
  }

  displayType() {
    return this.props.tableState === 'new' ? 'flex' : 'none'
  }

  shouldDisable(idx) {
    return this.props.disabledPlayers.includes(idx);
  }

  render() {
    const playerCount = this.props.playerCount;
    const radius = 150;
    const playerSize = this.getPlayerSize(playerCount);
    const scoreSize = playerSize/2;

    const centerX = radius - playerSize/2;
    const centerY = radius - playerSize/2;

    const width = 1;
    const backgroundPath = this.createPath(radius, radius, radius - width / 2, 0, 360);
    const lengthFromCenter = radius / 1.5;

    let { chevronPosition } = this.state;

    return (

      <Animated.View
        style={[{
          height:radius * 2,
          width:radius * 2,
          transform: [{rotate: this.props.spin}]
        }, styles.table]}
      >
        <Surface
          width={radius * 2}
          height={radius * 2}>
          <Group rotation={-90} originX={radius} originY={radius}>
            <Shape d={backgroundPath} stroke={'black'} strokeWidth={width}/>
          </Group>
        </Surface>
        {
          [...Array(playerCount)].map((_, idx) => {

            const degree = 360 / playerCount * idx;
            const radian = degree / (180 / Math.PI);
            const x = Math.sin(radian) * lengthFromCenter;
            const y = Math.cos(radian) * lengthFromCenter;

            return (
              <TouchableOpacity
                key={`Player${idx + 1}`}
                onPress={() => this.props.onPlayerTouch(idx)}
                style={[{
                  backgroundColor: this.props.playerOrder[idx],
                  width: playerSize,
                  height: playerSize,
                  left: centerX - x,
                  top: centerY + y,
                  shadowColor: this.shouldHighlight(idx) ? '#000' : undefined,
                  shadowOffset: this.shouldHighlight(idx) ? { width: 1, height: 3 } : undefined,
                  shadowOpacity: this.shouldHighlight(idx) ? 0.8 : undefined,
                  shadowRadius: this.shouldHighlight(idx) ? 3 : undefined,
                  opacity: this.shouldDisable(idx) ? 0.3 : 1
                }, styles.circle]}
                disabled={this.shouldDisable(idx)}
              >
              <Text
                style={[{
                  fontSize: scoreSize,
                  display: this.displayType(),
                }, styles.score]}>{this.props.playerScores[this.props.playerOrder[idx]]}</Text>
              </TouchableOpacity>
            )
          })
        }
        <Animated.Image
          style={{display: this.displayType(), top: 15, width: 20, height: 20, transform: [{translateY: chevronPosition}]}}
          source={require('../config/img/chevron.png')}
        />
      </Animated.View>
    );
  }
};

TableVisuals.defaultProps = {
  disabledPlayers: []
}

const styles = StyleSheet.create({
  table: {
    marginLeft: 10,
    alignItems: 'center'
  },
  circle: {
    borderWidth: 2,
    borderColor:'rgba(0,0,0,0.4)',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:50,
    position: 'absolute'
  },
  score: {
    color: 'black'
  }
});

export default TableVisuals;
