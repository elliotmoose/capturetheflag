import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView } from "react-native";
import Images from "../assets/Images";
import { EventRegister } from "react-native-event-listeners";
import * as UserManager from '../managers/UserManager';

export default class LoadingScreen extends Component {
    state = {
        
    }

    componentWillMount() {
        UserManager.VerifyLoggedInUser();
        // this.room_state_event_listener = EventRegister.on('CUSTOM_ROOM_UPDATE', (room)=> this.setState({room}));        
    }
    componentWillUnmount() {
        // EventRegister.removeEventListener(this.room_state_event_listener);
    }

    
    render() {        
        return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={Images.menu_background} resizeMode='cover' style={{position: 'absolute', width: '100%', height: '100%'}}/>                                  
            <Text>
                LOADING
            </Text>
        </View>
    }
}