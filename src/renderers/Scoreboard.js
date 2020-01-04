import React, { PureComponent } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Colors } from "../constants/Colors";


export default class Scoreboard extends PureComponent {
    render() {
        let score = this.props.score;
        let time = this.props.time;

        return (
            <View style={[styles.container, { right: 12, top: 40, justifyContent: 'flex-end'}]}>   
                <View style={{justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row'}}>   
                    <Text style={{fontFamily: 'Endless Boss Battle', fontSize: 32}}> {score[0]} </Text>
                    <Text style={{fontFamily: 'Endless Boss Battle', fontSize: 32}}> vs </Text>
                    <Text style={{fontFamily: 'Endless Boss Battle', fontSize: 32}}> {score[1]} </Text>
                </View>
                <Text style={{fontFamily: 'Endless Boss Battle', fontSize: 22, color: 'white'}}> {time} </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        zIndex: 999
    }
});
