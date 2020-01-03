import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "../constants/Colors";

 
const RADIUS = 20;
 
export default class Stamina extends PureComponent {
  render() {
    let percentage = this.props.percentage;    
            
    let percentage_string = `${Math.round(percentage*100)}%`;
    return (
      <View style={[styles.container, {...this.props.style}, {borderRadius: this.props.style.height/2, overflow: 'hidden'}]}>        
        <View style={{height: '100%', width: percentage_string, backgroundColor: Colors.lime_green}}/>
      </View>      
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    borderColor: "#CCC",    
    backgroundColor: Colors.red,
    position: "absolute",
    padding: 0,
    // width: 200, 
    // height: 200,    
  }
});
