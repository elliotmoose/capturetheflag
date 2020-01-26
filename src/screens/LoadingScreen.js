import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, SafeAreaView } from "react-native";
import Images from "../assets/Images";
import { EventRegister } from "react-native-event-listeners";
import * as UserManager from '../managers/UserManager';


const LOADING_STATUSES = ['Connecting...', 'Logging In...']
export default class LoadingScreen extends Component {
    state = {
        loading_status: LOADING_STATUSES[0]
    }

    componentWillMount() {
        UserManager.VerifyLoggedInUser();
        // this.room_state_event_listener = EventRegister.on('CUSTOM_ROOM_UPDATE', (room)=> this.setState({room}));        
    }
    componentWillUnmount() {
        // EventRegister.removeEventListener(this.room_state_event_listener);
    }

    
    render() {        
        return <View style={{width: '100%', height: '100%'}}>
            <Image source={Images.menu_background} resizeMode='cover' style={{position: 'absolute', width: '100%', height: '100%'}}/>                                  
            <SafeAreaView style={{flex: 1}}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop :12}}>
                    <View style={{height: 50, width: '50%'}}>
                        <Text style={{fontFamily: 'Endless Boss Battle', fontSize: 60, textAlign: 'center', color: 'black', position: 'absolute', top: 4, left: 4, width: '100%', height: '100%'}}>
                            LOADING
                        </Text>
                        <Text style={{fontFamily: 'Endless Boss Battle', fontSize: 60, textAlign: 'center', color: 'white', position: 'absolute', width: '100%', height: '100%'}}>
                            LOADING
                        </Text>
                    </View>
                    <View style={{height: 20}}/>
                    <Text style={{fontFamily: 'Endless Boss Battle', fontSize: 22, textAlign: 'center', color: 'white'}}>
                        {this.state.loading_status}
                    </Text>

                </View>
            </SafeAreaView>
        </View>
    }
}