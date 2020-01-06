import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import Images from "../assets/Images";
import { Colors } from "../constants/Colors";
import { RequestJoinCustomRoom } from "../managers/gamemanager";

export default class LobbyScreen extends Component {
    state = {
        rooms: [
            {
                id: 'asdfg',
                name: 'elliotmoose\'s room',
                player_count: 5,
                config: {
                    max_players: 10,   
                    game_length: 10,                  
                }
            }
        ],
        selectedIndex: null
    }

    selectRoom(index) {
        if(index == this.state.selectedIndex) {
            this.setState({selectedIndex: null});
        }
        else {
            this.setState({selectedIndex: index});
        }
    }

    joinRoom() {        
        if(this.state.selectedIndex != null && this.state.rooms[this.state.selectedIndex]) {
            console.log(this.state.rooms[this.state.selectedIndex].id);
            RequestJoinCustomRoom(this.state.rooms[this.state.selectedIndex].id);
        }
    }

    createRoom() {
        
    }

    back() {
        this.props.back && this.props.back();
    }

    renderRooms() {
        return this.state.rooms.map((room, index) => {
            let backgroundColor = "white";
            if(index == this.state.selectedIndex) {
                backgroundColor = Colors.green;
            }
            return <TouchableOpacity key={index} style={{ margin: 12, height: 45}} onPress={()=> this.selectRoom(index)}>
                <View style={{width: '100%', height: '100%', flexDirection: 'row'}}>
                <View style={{ backgroundColor: backgroundColor, opacity: 0.39, position: 'absolute', height: '100%', width: '100%' }} />
                <Text style={{fontFamily: 'Endless Boss Battle', fontSize: 18, textAlign: 'center', color: 'white', marginTop: 8, marginLeft: 8}}>{room.name}</Text>
                <View style={{ flex: 1 }} />
                <View style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                    <Text style={{fontFamily: 'Endless Boss Battle', fontSize: 15, textAlign: 'center', color: 'white', marginTop: 4, marginRight: 5}}>{room.player_count}/{room.config.max_players}</Text>
                    <Text style={{fontFamily: 'Endless Boss Battle', fontSize: 15, textAlign: 'center', color: 'white', marginTop: 4, marginRight: 5}}>{room.config.game_length}:00</Text>
                </View>
            </View>
            </TouchableOpacity>
        })
    }

    render() {        
        return <View style={{ flex: 1, backgroundColor: 'gray', alignItems: 'center' }}>
            <Image source={Images.menu_background} resizeMode='cover' style={{position: 'absolute', width: '100%', height: '100%'}}/>
            <TouchableOpacity style={{position: 'absolute', top: 26, left: 32,}} onPress={()=>this.back()}>
                <Text style={{fontFamily: 'Endless Boss Battle', fontSize: 22, color: 'white'}}>
                    {"< BACK"}
                </Text>
            </TouchableOpacity>
            <View style={{marginTop: 22, width: 300, marginBottom: 20, height: 27}}>
                <Text style={{fontFamily: 'Endless Boss Battle', fontSize: 32, textAlign: 'center', color: 'black', position: 'absolute', left: 4, top: 4, width: 300}}>
                    LOBBY
                </Text>
                <Text style={{fontFamily: 'Endless Boss Battle', fontSize: 32, textAlign: 'center', color: 'white', position: 'absolute', width: 300}}>
                    LOBBY
                </Text>
            </View>
            <View style={{borderWidth: 1, borderColor: 'black', borderRadius: 12, flex: 1, width: '80%', overflow: 'hidden'}}>
                <View style={{backgroundColor:'white', opacity: 0.13, position: 'absolute', width: '100%', height: '100%'}}/>
                {this.renderRooms()}
            </View>
            <View style={{height: 50, width: '80%', margin: 20, flexDirection: 'row', justifyContent: 'flex-end'}}>
                <TouchableOpacity style={{height: '100%', width: 200, backgroundColor: Colors.yellow, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontFamily: 'Endless Boss Battle', fontSize: 22, paddingTop: 4, textAlign: 'center', color: 'white', position: 'absolute'}} onPress={()=>this.createRoom()}>
                        CREATE ROOM
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{height: '100%', width: 200, backgroundColor: this.state.selectedIndex != null ? Colors.green : Colors.gray, justifyContent: 'center', alignItems: 'center'}} onPress={()=>this.joinRoom()}>
                    <Text style={{fontFamily: 'Endless Boss Battle', fontSize: 22, paddingTop: 4, textAlign: 'center', color: 'white', position: 'absolute'}}>
                        JOIN ROOM
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    }
}