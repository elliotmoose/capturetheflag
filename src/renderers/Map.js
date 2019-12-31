import React, { PureComponent } from "react";
import { StyleSheet, View, Image } from "react-native";
import Images from "../assets/Images";
 
 
export default class Map extends PureComponent {
  render() {
    let x = this.props.render_position[0];
    let y = this.props.render_position[1];
    return (
      <Image source={Images.map} style={[styles.container, {left: x, top: y}]} resizeMode="cover"/>              
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    width: 1500,
    height: 2500,    
    position: "absolute",
    padding: 0,
  }
});
