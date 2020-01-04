import React, { PureComponent } from "react";
import { StyleSheet, View, Dimensions } from "react-native";

const {width: SCREENWIDTH, height: SCREENHEIGHT} = Dimensions.get('window'); //landscape
 
export default class Minimap extends PureComponent {

    renderPlayers(scale) {
        return this.props.players.map(player => {

            let newRadius = player.radius * scale
            let newTop = player.position[1] * scale - newRadius
            let newLeft = player.position[0] * scale - newRadius

            return <View style={[styles.player_0, 
                {height: newRadius * 2, width: newRadius * 2, borderRadius: newRadius,
                top: newTop, left: newLeft}]}/>
        })
    }

    render() {
        let SCALE = SCREENHEIGHT / 2 / this.props.height;
        return (
            <View style={[styles.container, {height: this.props.height * SCALE, width: this.props.width * SCALE}]} >
                {this.renderPlayers(SCALE)}
            </View>
        );
  }
}
 
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    position: "absolute",
    top: 10,
    left: 10,
  },
  player_0: {
    backgroundColor: "#F00",
    position: "absolute"
  },
  player_1: {
    backgroundColor: "#00F",
    position: "absolute"
  },
  flag_0: {

  },
  flag_1: {

  }
});
