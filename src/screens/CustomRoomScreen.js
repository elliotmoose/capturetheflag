import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import Images from "../assets/Images";
import { Colors } from "../constants/Colors";
import * as GameManager from "../managers/gamemanager";
import { EventRegister } from "react-native-event-listeners";
import { GetLoggedInUser } from "../managers/UserManager";

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

    joinTeam(team) {
        GameManager.RequestJoinTeam(team);
    }

    kickUser(user_id) {
        if(this.state.room && this.state.room.id) {
            GameManager.RequestKickUser(user_id, this.state.room.id);
        }
    }

    renderPlayersInTeam(team) {
        let room = this.state.room;
        if(!room) {
            return <View/>
        }
        let players = room.users.filter(p=> p.team == team);

        let no_of_players_per_team = Math.round(room.config.max_players/2);
        let views = [];

        

        for(let i=0;i<no_of_players_per_team; i++) {            
            let marginTop = 4;
            if(i == 0) {
                marginTop = 0
            }            

            let player = players[i];

            if(player == undefined) {
                views.push(<TouchableOpacity style={{backgroundColor: 'white', opacity: 0.13, marginTop: marginTop, flex: 1, justifyContent: 'center', alignItems: 'center'}} onPress={()=> this.joinTeam(team)}>
                    <Text>Join Team</Text>
                </TouchableOpacity>);
                continue;
            }
            else {
                let is_room_owner = this.isRoomOwner(player.id);
                let logged_in_user = GetLoggedInUser();
                let is_me = player.id == logged_in_user.id;
                let background_color = is_room_owner ? Colors.green : (is_me ? Colors.yellow : 'white');
                // let background_color = player.team == 0 ? Colors.yellow : Colors.yellow;
                views.push(<View key={player.id} style={{backgroundColor: background_color, marginTop: marginTop, flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontFamily: 'Endless Boss Battle', fontSize: 22, color: 'white', marginLeft: 8, marginTop: 4}}>
                        {player.username}
                    </Text>
                    <View style={{flex: 1}}></View>
                    {false || <TouchableOpacity style={{height: 24, marginRight: 4, justifyContent: 'center', alignItems: 'center'}} onPress={()=>this.kickUser(player.id)}>
                        <Text style={{fontFamily: 'Endless Boss Battle', fontSize: 32, color: Colors.red}}>X</Text>
                        </TouchableOpacity>}
                </View>);
            }
        }

        return <View style={{flex: 1, margin: 8}}>
            <View style={{justifyContent: 'center', alignItems: 'center', height: 30, width: '100%'}}>  
                <Text style={{fontFamily: 'Endless Boss Battle', fontSize: 22, color: team == 0 ? Colors.green : Colors.red}}>{team == 0 ? 'Green Team' : 'Red Team'}</Text>
            </View>
            {views}
        </View>;
    }
    
    isRoomOwner(id) {                
        return this.state.room != undefined && this.state.room.owner_id == id;
    }

    leaveRoom() {
        GameManager.RequestBackToLobby();
        GameManager.RequestLoadLobbyRooms();
    }

    startGame() {
        GameManager.RequestStartGame();
    }

    render() {        
        let room_name = this.state.room ? this.state.room.name : 'Not Connected';      
        let logged_in_user = GetLoggedInUser();  
        let is_room_owner = this.isRoomOwner(logged_in_user.id);
        return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={Images.menu_background} resizeMode='cover' style={{position: 'absolute', width: '100%', height: '100%'}}/>                      
            <View style={{width: '100%', height: 27, marginTop: 20, marginBottom: 16,}}>
                <View style={{marginLeft: 22,  height: '100%'}}>
                    <Text style={{fontFamily: 'Endless Boss Battle', fontSize: 32, textAlign: 'center', color: 'black', position: 'absolute', left: 4, top: 4, width: 300}}>
                    {room_name}
                    </Text>                
                    <Text style={{fontFamily: 'Endless Boss Battle', fontSize: 32, textAlign: 'center', color: 'white', position: 'absolute', width: 300}}>
                        {room_name}
                    </Text>
                </View>
            </View>
            <View style={{borderWidth: 1, borderColor: 'black', borderRadius: 12, flex: 1, width: '80%', overflow: 'hidden', flexDirection: 'row'}}>
                <View style={{backgroundColor:'white', opacity: 0.13, position: 'absolute', width: '100%', height: '100%'}}/>                
                {this.renderPlayersInTeam(0)}
                <View style={{width: 50}}/>
                {this.renderPlayersInTeam(1)}
            </View>
            <View style={{height: 50, width: '80%', margin: 20, flexDirection: 'row', justifyContent: 'flex-end'}}>
                <TouchableOpacity style={{flex: 1, backgroundColor: Colors.gray, justifyContent: 'center', alignItems: 'center'}} onPress={()=>this.leaveRoom()}>
                    <Text style={{fontFamily: 'Endless Boss Battle', fontSize: 22, paddingTop: 4, textAlign: 'center', color: 'white', position: 'absolute'}}>
                        LEAVE ROOM
                    </Text>
                </TouchableOpacity>
                <View style={{flex: 1}}/>
                { is_room_owner ?  <TouchableOpacity style={{flex: 1,backgroundColor: Colors.green, justifyContent: 'center', alignItems: 'center'}} onPress={()=>this.startGame()}>
                    <Text style={{fontFamily: 'Endless Boss Battle', fontSize: 22, paddingTop: 4, textAlign: 'center', color: 'white', position: 'absolute'}}>
                        START GAME
                    </Text>
                </TouchableOpacity> : <View style={{flex: 1}}/>}
            </View>
        </View>
    }
}