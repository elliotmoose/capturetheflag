import React, { PureComponent } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Colors } from "../constants/Colors";
import { UI } from "../constants/UI";


export default class Scoreboard extends PureComponent {
    render() {
        let score = this.props.score;
        let time = this.props.time;
        let time_color = this.props.time_color;

        return (
            <View style={[styles.container, { right: 12, top: 40,alignItems: 'flex-end'}]}>   
                <View style={{justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row'}}>   
                    <Text style={{fontFamily: 'Endless Boss Battle', fontSize: 32, color: Colors.lime_green}}> {score[0]} </Text>
                    <Text style={{fontFamily: 'Endless Boss Battle', fontSize: 32, color: 'white'}}> vs </Text>
                    <Text style={{fontFamily: 'Endless Boss Battle', fontSize: 32, color: Colors.red}}> {score[1]} </Text>
                </View>
                <Text style={{fontFamily: 'Endless Boss Battle', fontSize: 22, color: time_color}}> {time} </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        zIndex: UI.controls.zIndex
    }
});
