import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { Platform, ART } from 'react-native'
const { Surface, Shape, Path, Group } = ART

class TableVisuals extends Component {
  constructor(props) {
     super(props);
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

  shouldHighlight(idx) {
    return idx === this.props.highlightIdx;
  }

  render() {
    let startValue = 0;
    const playerCount = this.props.playerCount;
    const radius = 120;

    const centerX = radius - 20;
    const centerY = radius - 20;

    const width = 1;
    const backgroundPath = this.createPath(radius, radius, radius - width / 2, 0, 360);
    const lengthFromCenter = radius / 1.5;

    return (
      <View
        style={{ height:radius * 2, width:radius * 2}}
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
                  left: centerX - x,
                  top: centerY + y,
                  shadowColor: this.shouldHighlight(idx) ? '#000' : undefined,
                  shadowOffset: this.shouldHighlight(idx) ? { width: 1, height: 3 } : undefined,
                  shadowOpacity: this.shouldHighlight(idx) ? 0.8 : undefined,
                  shadowRadius: this.shouldHighlight(idx) ? 3 : undefined
                }, styles.circle]}
              >
              <Text style={styles.score}>{this.props.playerScores[this.props.playerOrder[idx]]}</Text>
              </TouchableOpacity>
            )
          })
        }
      </View>
    );
  }
};

const styles = StyleSheet.create({
  circle: {
    borderWidth: 2,
    borderColor:'rgba(0,0,0,0.4)',
    alignItems:'center',
    justifyContent:'center',
    width:40,
    height:40,
    borderRadius:40,
    marginBottom: 0, //Needs adjusting
    position: 'absolute'
  },
  score: {
    fontSize: 20,
    color: 'black'
  }
});

export default TableVisuals;
