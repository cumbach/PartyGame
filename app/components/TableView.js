import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Platform, ART } from 'react-native'
const { Surface, Shape, Path, Group } = ART

import { colors } from '../config/data';

class TableView extends Component {
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

  render() {
    let startValue = 0;
    const playerCount = this.props.players.playerCount;
    const viewHeight = 375;
    const viewWidth = 667;
    const radius = 120;

    const centerX = Math.ceil(viewWidth / 2) - 20;
    const centerY = Math.ceil(viewHeight / 2) - 20;

    const width = 1;
    const backgroundPath = this.createPath(radius, radius, radius - width / 2, 0, 360);
    const lengthFromCenter = radius / 1.5;

    return (
      <View
        style={styles.container}
        onLayout={(event) => {
          const { x, y, width, height } = event.nativeEvent.layout;
          console.log(width);
        }}
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
            const x = Math.cos(radian) * lengthFromCenter;
            const y = Math.sin(radian) * lengthFromCenter;

            return (
              <TouchableOpacity
                key={`Player${idx}`}
                onPress={() => undefined}
                style={[{
                  backgroundColor: colors[idx],
                  left: centerX - y,
                  top: centerY + x
                }, styles.circle]}
              >
              </TouchableOpacity>
            )
          })
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
  circle: {
    borderWidth:2,
    borderColor:'rgba(0,0,0,0.4)',
    alignItems:'center',
    justifyContent:'center',
    width:40,
    height:40,
    borderRadius:40,
    marginBottom: 0, //Needs adjusting
    position: 'absolute'
  },
  ready: {
    position: 'absolute', // Take out when possible
    borderWidth:1,
    backgroundColor: 'lightgreen',
    overflow:'hidden', // doesn't work on Android??
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    fontSize: 34,
    color: 'black',
    textAlign: 'center',
    width: 130,
    left: -65 // Take out when positioning working correctly
  }
});

export default connect(({ players }) => ({ players }))(TableView);

// {[25, 25, 25, 25].map((item, idx) => {
//   startAngle = startValue / 100 * 2  * Math.PI
//   arcAngle = item / 100 * 2  * Math.PI
//   startValue = startValue + item
//   const path  = this.createPath(radius, radius, radius - width / 2, startAngle, arcAngle)
//
//   return (
//     <Shape key={idx} d={path} stroke={'white'} strokeWidth={10} strokeCap='butt'>
//       <TouchableOpacity
//         key={`circle${idx}`}
//         onPress={() => undefined}
//         style={[{backgroundColor: 'black'}, styles.circle]}>
//       </TouchableOpacity>
//     </Shape>
//   )
// })}
