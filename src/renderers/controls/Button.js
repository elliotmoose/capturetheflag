import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";
 
export default class Button extends PureComponent {
  render() {
    let radius = this.props.radius;
    let x = this.props.position[0] - radius;
    let y = this.props.position[1] - radius;
    
    return (
      <View style={[styles.container, { left: x, top: y, borderRadius: radius, height: radius*2, width: radius*2, opacity: this.props.active ? 0.5 : 1}]}>
          
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    borderColor: "#CCC",    
    backgroundColor: "lightgreen",
    position: "absolute",
    padding: 0,
    zIndex: 999
  }
});
