import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import Images from "../assets/Images";
import { Colors } from "../constants/Colors";
import * as GameManager from "../managers/gamemanager";
import { EventRegister } from "react-native-event-listeners";
import { logged_in_user } from "../managers/UserManager";

export default class CreateRoomScreen extends Component {
    state = {
        room: undefined
    }

    componentWillMount() {
        this.room_state_event_listener = EventRegister.on('CUSTOM_ROOM_UPDATE', (room)=> this.setState({room}));        
    }
    componentWillUnmount() {
        EventRegister.removeEventListener(this.room_state_event_listener);
    }

    joinTeam(team) {
        GameManager.RequestJoinTeam(team);
    }
    
    render() {        
        let room_name = this.state.room ? this.state.room.name : 'Not Connected';        
        return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={Images.menu_background} resizeMode='cover' style={{position: 'absolute', width: '100%', height: '100%'}}/>                      
            <View style={{width: '100%', height: 27, marginTop: 20, marginBottom: 16,}}>
                <View style={{marginLeft: 0,  height: '100%'}}>
                    <Text style={{fontFamily: 'Endless Boss Battle', fontSize: 32, textAlign: 'center', color: 'black', position: 'absolute', left: 4, top: 4, width: 300}}>
                    {room_name}
                    </Text>                
                    <Text style={{fontFamily: 'Endless Boss Battle', fontSize: 32, textAlign: 'center', color: 'white', position: 'absolute', width: 300}}>
                        {room_name}
                    </Text>
                </View>
            </View>
           
            <TouchableOpacity style={{flex: 1, backgroundColor: Colors.gray, justifyContent: 'center', alignItems: 'center'}} onPress={()=>this.leaveRoom()}>
                <Text style={{fontFamily: 'Endless Boss Battle', fontSize: 22, paddingTop: 4, textAlign: 'center', color: 'white', position: 'absolute'}}>
                    LEAVE ROOM
                </Text>
            </TouchableOpacity>
            
        </View>
    }
}