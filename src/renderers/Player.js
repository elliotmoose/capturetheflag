import React, {PureComponent} from 'react';
import {StyleSheet, View} from 'react-native';
import Stamina from './Stamina';


export default class Player extends PureComponent {
  render() {
    // console.log(this.props.current_stamina);
    // let x = this.props.position[0] - RADIUS;
    // let y = this.props.position[1] - RADIUS;
    let radius = this.props.radius;    
    let x = this.props.render_position[0] - radius;
    let y = this.props.render_position[1] - radius;
    
    let action_radius = this.props.radius + this.props.reach;
    let action_x = radius - action_radius;
    let action_y = radius - action_radius;    

    let stamina_percentage = this.props.current_stamina / this.props.max_stamina;

    const stamina_width = 80;
    const stamina_height = 14;
    const stamina_margin_bottomm = 12;

    return (
      <View style={{position: 'absolute', left: x, top: y, height: radius * 2, width: radius * 2, zIndex: 500}}>
        <View style={{position:'absolute',width: '100%', height: '100%', borderRadius: radius, backgroundColor: this.props.team == 0 ? 'yellow' : 'orange'}}/>
        <Stamina style={{left: radius - stamina_width / 2, top: -(stamina_height + stamina_margin_bottomm), width: stamina_width, height: stamina_height}} percentage={stamina_percentage} />
        <View style={[styles.action_indicator, {left: action_x, top: action_y,borderRadius: action_radius ,width: action_radius*2, height: action_radius*2, opacity: this.props.action ? 0.2 : 0}]}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderColor: '#CCC',
    backgroundColor: 'yellow',
    position: 'absolute',
    padding: 0,    
  },
  action_indicator: {    
    backgroundColor: 'black',
    zIndex: -100
  }
});
