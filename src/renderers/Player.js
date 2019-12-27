import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";
import Stamina from "./Stamina";
 
const RADIUS = 20;
 
export default class Player extends PureComponent {
  render() {
    let x = this.props.position[0] - RADIUS;
    let y = this.props.position[1] - RADIUS;
    let stamina_percentage = this.props.current_stamina/this.props.max_stamina;        

    const stamina_width = 80;
    const stamina_height = 14;
    const stamina_margin_bottomm = 12;
    return (
      <View style={[styles.container, { left: x, top: y, borderRadius: RADIUS, height: RADIUS*2, width: RADIUS*2, }]}>
        <Stamina style={{left: RADIUS - stamina_width/2, top: -(stamina_height + stamina_margin_bottomm), width: stamina_width, height: stamina_height}} percentage={stamina_percentage}/>
      </View>      
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
