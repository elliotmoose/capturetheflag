import React, { PureComponent } from "react";
import { StyleSheet, View, Image } from "react-native";
import Images from "../assets/Images";
import { UI } from "../constants/UIConstants";
 
export default class Flag extends PureComponent {
  render() {
    // let x = this.props.position[0] - RADIUS;
    // let y = this.props.position[1] - RADIUS;
    let radius = this.props.radius;
    let x = this.props.render_position[0] - radius;
    let y = this.props.render_position[1] - radius;
    return (
      <Image source={this.props.team == 0 ? Images.flag_green : Images.flag_red} resizeMode='contain' style={[styles.container, { left: x, top: y, borderRadius: radius, height: radius*2, width: radius*2, }]}/>        
    );
  }
}
 
const styles = StyleSheet.create({
  container: {        
    position: "absolute",
    padding: 0,
    zIndex: UI.flag.zIndex
  }
});
