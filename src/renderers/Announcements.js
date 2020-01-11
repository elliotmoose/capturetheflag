import React, { PureComponent } from "react";
import { View, Text } from "react-native";
import { UI } from "../constants/UI";
 
export default class Announcements extends PureComponent {

  renderMessages() {

    return this.props.messages.map(message => {

      return <Text style={{
        fontFamily: 'Endless Boss Battle',
        fontSize: UI.announcements.fontSize,
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
    }}>{message}</Text>

    })
  }

  render() {
    return (
      <View 
      style={{
        position: "absolute",
        width: "100%",
        zIndex: UI.announcements.zIndex,
        flexDirection: "column-reverse",
        alignItems: "center",
      }}>
        {this.renderMessages()}
        </View>
    );
  }
}