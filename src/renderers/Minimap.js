import React, { PureComponent } from "react";
import { StyleSheet, View, Dimensions, Image } from "react-native";
import { Colors } from "../constants/Colors";
import Images from "../assets/Images";

const {width: SCREENWIDTH, height: SCREENHEIGHT} = Dimensions.get('window'); //landscape

const SCREEN_SCALE = 0.5 //Ratio of height of minimap to height of screen
const FLAG_SCALE_FACTOR = 3 //Flags appear too small if we follow the main game scale. This factor helps to mitigate that
 
export default class Minimap extends PureComponent {

    renderPlayers(scale) {
        return this.props.players.map(player => {

            let newRadius = player.radius * scale
            let newTop = player.position[1] * scale - newRadius
            let newLeft = player.position[0] * scale - newRadius
            let playerColor = (player.team==0) ? Colors.lime_green : Colors.red

            return <View style={[{height: newRadius * 2, width: newRadius * 2, borderRadius: newRadius,
                top: newTop, left: newLeft,
                backgroundColor: playerColor, position: "absolute"}]}/>
        })
    }

    renderFlags(scale) {
        return this.props.flags.map(flag => {

            let newRadius = flag.radius * scale * FLAG_SCALE_FACTOR // Only apply FLAG_SCALE_FACTOR to the radius so as not to mess up positioning
            let newTop = flag.position[1] * scale - newRadius
            let newLeft = flag.position[0] * scale - newRadius
            let flagImage = (flag.team == 0) ? Images.flag_green : Images.flag_red

            return <Image 
                source={flagImage}
                resizeMode="contain"
                style={{
                    position: "absolute",
                    height: newRadius * 2,
                    width: newRadius * 2,
                    borderRadius: newRadius,
                    top: newTop,
                    left: newLeft,
                }}/>

        })
    }



    render() {
        let scale = SCREENHEIGHT * SCREEN_SCALE / this.props.height; //Actual scaling ratio of minimap to real game. Different from SCREEN_SCALE
        return (
            <View style={[styles.container, {height: this.props.height * scale, width: this.props.width * scale}]} >
                {this.renderPlayers(scale)}
                {this.renderFlags(scale)}
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
    }
});
