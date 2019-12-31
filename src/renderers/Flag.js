import React, { PureComponent } from "react";
import { StyleSheet, View, Image } from "react-native";
import Images from "../assets/Images";
 
export default class Flag extends PureComponent {
  render() {
    // let x = this.props.position[0] - RADIUS;
    // let y = this.props.position[1] - RADIUS;
    let radius = 10;
    let x = this.props.render_position[0] - radius;
    let y = this.props.render_position[1] - radius;
    return (
      <Image source={Images.map} resizeMode='contain' style={[styles.container, { left: x, top: y, borderRadius: radius, height: radius*2, width: radius*2, }]}/>        
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
