import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView } from "react-native";
import Images from "../assets/Images";
import { Colors } from "../constants/Colors";
import * as GameManager from "../managers/gamemanager";
import { EventRegister } from "react-native-event-listeners";
import { logged_in_user, SignupNewPlayer } from "../managers/UserManager";

export default class UsernameScreen extends Component {
    state = {
        username: ''
    }

    componentWillMount() {
        this.room_state_event_listener = EventRegister.on('CUSTOM_ROOM_UPDATE', (room)=> this.setState({room}));        
    }
    componentWillUnmount() {
        EventRegister.removeEventListener(this.room_state_event_listener);
    }

    async submitUsername() {
        // this.state.username        
        let response = await SignupNewPlayer(this.state.username);                
    }
    
    render() {        
        let title = "New Player"
        return <View style={{flex: 1}}>
            <Image source={Images.menu_background} resizeMode='cover' style={{position: 'absolute', width: '100%', height: '100%'}}/>                                  
             <View style={{width: '100%', height: 27, marginTop: 20, alignItems: 'center'}}>
                 <View style={{height: '100%', width: 300}}>
                     <Text style={{fontFamily: 'Endless Boss Battle', fontSize: 32, textAlign: 'center', color: 'black', position: 'absolute', left: 4, top: 4, width: 300}}>
                         {title}
                     </Text>                
                     <Text style={{fontFamily: 'Endless Boss Battle', fontSize: 32, textAlign: 'center', color: 'white', position: 'absolute', width: 300}}>
                         {title}
                     </Text>
                 </View>
             </View>
             <View style={{height: 50, width: '100%', marginTop: 22, justifyContent: 'center', alignItems: 'center'}}>
                <KeyboardAvoidingView  behavior='position' style={{height: 50, width: 450}}>    
                    <View style={{width: '100%', height: '100%', flexDirection: 'row'}}>
                        <TextInput placeholder="username" style={{height: 50, width: 300, textAlign: 'center', borderWidth: 1, borderColor: 'white', borderRadius: 12, fontFamily: 'Endless Boss Battle', fontSize: 20, color: 'white'}} 
                        placeholderTextColor='#CCC'
                        ref={(ref)=>this.username_text_input = ref}
                        onChangeText={(text)=> {this.setState({username: text})}}
                        autoCompleteType='off'
                        autoCapitalize='none'       
                        autoFocus={true}                 
                        >
                            {this.state.username}
                        </TextInput>
                        <TouchableOpacity style={{flex: 1, justifyContent: 'center', alignItems: 'center',}} 
                        onPress={()=>this.submitUsername()}>
                            <Text style={{fontFamily: 'Endless Boss Battle', fontSize: 22, paddingTop: 4, textAlign: 'center', color: 'white', position: 'absolute'}}>
                                Start > 
                            </Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </View>
        return <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <Image source={Images.menu_background} resizeMode='cover' style={{position: 'absolute', width: '100%', height: '100%'}}/>                      
            {/* <View style={{width: '100%', height: 27, marginTop: 20, alignItems: 'center'}}>
                <View style={{height: '100%', width: 300}}>
                    <Text style={{fontFamily: 'Endless Boss Battle', fontSize: 32, textAlign: 'center', color: 'black', position: 'absolute', left: 4, top: 4, width: 300}}>
                        {title}
                    </Text>                
                    <Text style={{fontFamily: 'Endless Boss Battle', fontSize: 32, textAlign: 'center', color: 'white', position: 'absolute', width: 300}}>
                        {title}
                    </Text>
                </View>
            </View> */}

            <View style={{height: 50, width: '100%', marginTop: 22, justifyContent: 'center', alignItems: 'center', backgroundColor: 'green'}}>
                <View style={{flex: 1, backgroundColor: 'red'}}/>
                {/* <KeyboardAvoidingView  behavior='position' style={{height: 50, width: 450, flexDirection: 'row', backgroundColor: 'green'}}>    
                    <TextInput placeholder="username" style={{height: 50, width: 300, textAlign: 'center', borderWidth: 1, borderColor: 'white', borderRadius: 12, fontFamily: 'Endless Boss Battle', fontSize: 20, backgroundColor: 'red'}} 
                    placeholderTextColor='#CCC'
                    ref={(ref)=>this.username_text_input = ref}
                    onChangeText={(text)=> {this.setState({username: text})}}
                    >
                        {this.state.username}
                    </TextInput>
                    <TouchableOpacity style={{flex: 1, backgroundColor: 'yellow', justifyContent: 'center', alignItems: 'center',}} 
                    onPress={()=>this.submitUsername()}>
                        <Text style={{fontFamily: 'Endless Boss Battle', fontSize: 22, paddingTop: 4, textAlign: 'center', color: 'white', position: 'absolute'}}>
                            Play > 
                        </Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView> */}
            </View>
            <View style={{flex: 1}}/>
           
            
        </View>
    }
}