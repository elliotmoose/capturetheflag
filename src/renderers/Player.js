import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";
 
const RADIUS = 20;
 
export default class Player extends PureComponent {
  render() {
    const x = this.props.position[0] - RADIUS;
    const y = this.props.position[1] - RADIUS;        
    return (
      <View style={[styles.container, { left: x, top: y, borderRadius: RADIUS, height: RADIUS*2, width: RADIUS*2, }]}/>      
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    borderColor: "#CCC",    
    backgroundColor: "green",
    position: "absolute",
    padding: 0,
  },
  stick: {
    borderColor: "#CCC",
    backgroundColor: "red",
    position: "absolute"
  }
});
