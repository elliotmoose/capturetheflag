import React, { PureComponent } from "react";
import {View, Image, ImageBackground } from "react-native";
import { Colors } from "../constants/Colors";
import Images from "../assets/Images";

import { UI } from "../constants/UI";
import { logged_in_user } from "../managers/UserManager";
 
export default class Minimap extends PureComponent {

    renderPlayers(scale) {
        
        return this.props.players.map(player => {

            let newRadius = player.radius * scale;
            let newTop = player.position[1] * scale - newRadius;
            let newLeft = player.position[0] * scale - newRadius;
            let playerColor;

            if (player.id == logged_in_user.id) {
                playerColor = "yellow";
            } else {
                playerColor = (player.team==0) ? Colors.lime_green : Colors.red;
            }
            

            return <View style={[{height: newRadius * 2, width: newRadius * 2, borderRadius: newRadius,
                top: newTop, left: newLeft,
                backgroundColor: playerColor, position: "absolute"}]}/>
        })
    }

    renderFlags(scale) {
        return this.props.flags.map(flag => {

            let newRadius = flag.radius * scale * UI.minimap.flag_scale_factor // Only apply FLAG_SCALE_FACTOR to the radius so as not to mess up positioning
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

    renderBases(scale) {
        return this.props.bases.map(base => {

            let newRadius = base.radius * scale
            let newTop = base.position[1] * scale - newRadius
            let newLeft = base.position[0] * scale - newRadius

            return <View 
                style={{
                    position: "absolute",
                    height: newRadius * 2,
                    width: newRadius * 2,
                    borderRadius: newRadius,
                    top: newTop,
                    left: newLeft,
                    backgroundColor: "gray",
                    opacity: 0.5
                }}/>
        })
    }


    renderMiddleLine(scale) {
        let line_thickness = 1;
        return <View style={{
            position: "absolute",
            width: "100%",
            height: line_thickness,
            backgroundColor: "red",
            opacity: 0.5,
            top: this.props.height/2 - line_thickness/2             
        }}/>
    }

    render() {
        
        return (
            <View style={{
                position: "absolute",
                height: this.props.height,
                width: this.props.width,
                top: this.props.offset[1],
                left: this.props.offset[0],
                borderColor: 'gray',
                borderWidth: 2,
                borderRadius: 8,
                overflow:'hidden',
                zIndex: UI.controls.zIndex                
            }}>                                 
                <View style={{width: '100%', height: '100%', backgroundColor:'black', opacity: 0.3, position: 'absolute'}}/>
                <View 
                    // source={Images.map}
                    // resizeMode="cover"
                    style={{flex: 1}}>
                    {this.renderPlayers(this.props.scale)}
                    {this.renderFlags(this.props.scale)}
                    {this.renderBases(this.props.scale)}
                    {this.renderMiddleLine(this.props.scale)}
                </View>
            </View>
        );
  }
}
