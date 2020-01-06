import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import Images from "../assets/Images";
import { Colors } from "../constants/Colors";
import { RequestJoinCustomRoom, RequestLoadLobbyRooms, RequestCreateCustomRoom } from "../managers/gamemanager";
import { EventRegister } from "react-native-event-listeners";

export default class CustomRoomScreen extends Component {
    state = {
        room: undefined
    }

    componentWillMount() {
        this.room_state_event_listener = EventRegister.on('CUSTOM_ROOM_UPDATE', (room)=> this.setState({room}));        
    }
    componentWillUnmount() {
        EventRegister.removeEventListener(this.room_state_event_listener);
    }

    render() {        
        return <View style={{ flex: 1, alignItems: 'center' }}>
            <Image source={Images.menu_background} resizeMode='cover' style={{position: 'absolute', width: '100%', height: '100%'}}/>                      
            <Text>{this.state.room ? this.state.room.name : 'Not connected to any custom room'}</Text>
        </View>
    }
}