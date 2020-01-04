import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";

const SCALE = 0.1;
 
export default class Minimap extends PureComponent {
  render() {
    return (
        <View style={styles.container}></View>          
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    width: 1500 * SCALE,
    height: 2500 * SCALE,
    borderColor: "#FFF",
    backgroundColor: "#FFF",
    position: "absolute",
    top: 0,
    left: 0,
  }
});
