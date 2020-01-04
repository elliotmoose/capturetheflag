import React, { PureComponent } from "react";
import { StyleSheet, View, Text } from "react-native";

export default class Performance extends PureComponent {
    render() {
        let fps = this.props.fps;
        let ping = this.props.ping;

        return (
            <View style={[styles.container, { right: 12, top: 12, justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row' }]}>   
                <Text>
                    fps: {fps} ping: {ping}
                </Text>
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
