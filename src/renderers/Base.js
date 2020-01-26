import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";
import { UI } from "../constants/UI";
 
export default class Base extends PureComponent {
  render() {
    let radius = this.props.radius;
    let x = this.props.render_position[0] - radius;
    let y = this.props.render_position[1] - radius;
    
    return (
      <View style={[styles.container, { left: x, top: y, borderRadius: radius, height: radius*2, width: radius*2, opacity: 0.2}]}/>      
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    borderColor: "#CCC",    
    backgroundColor: "black",
    position: "absolute",
    padding: 0,
    zIndex: UI.base.zIndex,
    opacity: 0.1   
  }
});
