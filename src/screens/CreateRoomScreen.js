import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView, SafeAreaView, TextInput } from "react-native";
import Images from "../assets/Images";
import { Colors } from "../constants/Colors";
import * as GameManager from "../managers/gamemanager";
import { EventRegister } from "react-native-event-listeners";
import { logged_in_user } from "../managers/UserManager";

export default class CreateRoomScreen extends Component {
    state = {
        player_per_team: 5,
        max_score : 10,
        game_length : 10,
        room_title : '',
        room_password : '',
    }    

    componentWillMount() {
        if(!logged_in_user) {
            return;
        }
        let room_title = `${logged_in_user.username}'s room`;
        this.setState({room_title});
        // this.room_state_event_listener = EventRegister.on('CUSTOM_ROOM_UPDATE', (room)=> this.setState({room}));        
    }
    componentWillUnmount() {
        // EventRegister.removeEventListener(this.room_state_event_listener);
    }    

    back() {
        this.props.back && this.props.back();
    }

    create() {
        let room_title = this.state.room_title || `${logged_in_user.username}'s room`;
        GameManager.RequestCreateCustomRoom(room_title, this.state.player_per_team, this.state.max_score, this.state.game_length);
    }
    
    render() {        
        let title = 'CREATE ROOM';        
        return <View style={{ flex: 1, alignItems: 'center'}}>
            <Image source={Images.menu_background} resizeMode='cover' style={{position: 'absolute', width: '100%', height: '100%'}}/>                      
            <SafeAreaView>
                <View style={{height: 27, marginTop: 20, marginBottom: 16, marginLeft: -20}}>
                    <View style={{marginLeft: 0,  height: '100%'}}>
                        <Text style={{fontFamily: 'Endless Boss Battle', fontSize: 32, textAlign: 'center', color: 'black', position: 'absolute', left: 4, top: 4, width: 300}}>
                            {title}
                        </Text>                
                        <Text style={{fontFamily: 'Endless Boss Battle', fontSize: 32, textAlign: 'center', color: 'white', position: 'absolute', width: 300}}>
                            {title}
                        </Text>
                    </View>
                </View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.textInputHeader}>
                        Room Name: 
                    </Text>
                    <TextInput style={styles.textInput} onChangeText={(text)=>this.setState({room_title: text})}>
                        {this.state.room_title}
                    </TextInput>
                    {/* <Text style={styles.textInputHeader}>
                        Password (Optional):
                    </Text>
                    <TextInput style={styles.textInput} onChangeText={(text)=>this.setState({room_password: text})}>
                        {this.state.room_password}
                    </TextInput>                     */}
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <View style={styles.buttonOptionRow}>
                            {[1,2,3,4,5].map((item) => {
                                let selected = this.state.player_per_team == item;

                                return <TouchableOpacity style={styles.buttonOptionTouchable} onPress={()=>this.setState({player_per_team: item})}>
                                    <Text style={[styles.buttonOptionText, {color: selected ? Colors.green : 'white'}]}>
                                        {item}v{item}
                                    </Text>
                                </TouchableOpacity>
                            })}
                        </View>
                        <View style={styles.buttonOptionRow}>
                            {[1, 5,10,15].map((item) => {
                                let selected = this.state.game_length == item;

                                return <TouchableOpacity style={styles.buttonOptionTouchable} onPress={()=>this.setState({game_length: item})}>
                                    <Text style={[styles.buttonOptionText, {color: selected ? Colors.green : 'white'}]}>
                                        {item}:00
                                    </Text>
                                </TouchableOpacity>
                            })}
                        </View>
                        <View style={styles.buttonOptionRow}>
                            {[1, 5,10,15].map((item) => {
                                let selected = this.state.max_score == item;

                                return <TouchableOpacity style={styles.buttonOptionTouchable} onPress={()=>this.setState({max_score: item})}>
                                    <Text style={[styles.buttonOptionText, {color: selected ? Colors.green : 'white'}]}>
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            })}
                        </View>

                    </View>
                </View>
                <View style={{width: '100%', height: 50, flexDirection: 'row', marginTop: 14, paddingLeft: 12, paddingRight: 12}}>
                    <TouchableOpacity style={[styles.actionButton, {backgroundColor: Colors.gray}]} onPress={()=>this.back()}>
                        <Text style={{fontFamily: 'Endless Boss Battle', fontSize: 22, paddingTop: 4, textAlign: 'center', color: 'white', position: 'absolute'}}>
                            CANCEL
                        </Text>
                    </TouchableOpacity>
                    <View style={{flex: 1}}/>
                    <TouchableOpacity style={[styles.actionButton, {backgroundColor: Colors.yellow}]} onPress={()=>this.create()}>
                        <Text style={{fontFamily: 'Endless Boss Battle', fontSize: 22, paddingTop: 4, textAlign: 'center', color: 'white', position: 'absolute'}}>
                            CREATE ROOM
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    }
}

const styles = StyleSheet.create({
    textInput : {
        width: '50%', 
        maxWidth: 400, 
        height: 40, 
        backgroundColor: '#759597', 
        borderRadius: 11,
        paddingLeft: 12,
        color: 'white',
        marginTop: 5
    },
    textInputHeader : {
        fontFamily: 'Endless Boss Battle', 
        fontSize: 22, 
        textAlign: 'center', 
        color: 'white',
        marginTop: 14, 
        marginBottom: 3
    }, 
    buttonOptionTouchable : {
        flex: 1, 
        marginTop: 12
    },
    buttonOptionText : {
        fontFamily: 'Endless Boss Battle', fontSize: 22, textAlign: 'center', color: 'white',
    },
    buttonOptionRow : {
        width: '50%',
        height: 50,
        flexDirection: 'row'
    },
    actionButton: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    }
})