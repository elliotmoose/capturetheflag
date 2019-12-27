import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";
 
const RADIUS = 20;
 
export default class Joystick extends PureComponent {
  render() {
    var container_radius = this.props.outer_radius;
    var joystick_radius = this.props.inner_radius;
    const container_x = this.props.outer_position[0] - container_radius;
    const container_y = this.props.outer_position[1] - container_radius;    
    const stick_x = this.props.inner_position[0] + joystick_radius;
    const stick_y = this.props.inner_position[1] + joystick_radius;    
    return (
      <View style={[styles.container, { left: container_x, top: container_y, borderRadius: container_radius, height: container_radius*2, width: container_radius*2, }]}>
        <View style={[styles.stick, { left: stick_x, top: stick_y, borderRadius: joystick_radius, height: joystick_radius*2, width: joystick_radius*2, }]}/>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    borderColor: "#CCC",    
    backgroundColor: "pink",
    position: "absolute",
    padding: 0,
  },
  stick: {
    borderColor: "#CCC",
    backgroundColor: "red",
    position: "absolute"
  }
});
