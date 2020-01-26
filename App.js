/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component, useState, PureComponent } from 'react';
// import {} from 'react-native-socketio'
import { GameEngine } from 'react-native-game-engine';
import { EventRegister } from 'react-native-event-listeners';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    Dimensions,
    Image,
    TextInput,
    Alert,
} from 'react-native';

import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { PlayerSystem } from './src/systems/PlayerSystem';
import Joystick from './src/renderers/Joystick';
import {
    SendControls,
    CommandJoinGameRoom,
    players,
    InitializeSocketIO,    
    RequestLoadLobbyRooms,
    RequestFindMatch,
} from './src/managers/gamemanager';

import Player from './src/renderers/Player';
import Button from './src/renderers/controls/Button';
import { JoystickSystem } from './src/systems/JoystickSystem';
import { ButtonsSystem } from './src/systems/ButtonsSystem';
import { ControlsSystem } from './src/systems/ControlsSystem';
import Images from './src/assets/Images';
import { CameraSystem } from './src/systems/CameraSystem';
import Map from './src/renderers/Map';
import { FlagSystem } from './src/systems/FlagSystem';
import { GameStateSystem } from './src/systems/GameStateSystem';
import Minimap from './src/renderers/Minimap';
import { PerformanceSystem } from './src/systems/PerformanceSystem';
import Performance from './src/renderers/Performance';
import Scoreboard from './src/renderers/Scoreboard';
import { ScoreboardSystem } from './src/systems/ScoreboardSystem';
import { MinimapSystem } from './src/systems/MinimapSystem';
import { UI } from './src/constants/UI';
import LobbyScreen from './src/screens/LobbyScreen';
import CustomRoomScreen from './src/screens/CustomRoomScreen';
import { MatchmakingTypes } from './src/constants/Network';
import UsernameScreen from './src/screens/UsernameScreen';
import { game_domain } from './src/constants/Config';
import Announcements from './src/renderers/Announcements';
import { AnnouncementSystem } from './src/systems/AnnouncementSystem';
import LoadingScreen from './src/screens/LoadingScreen';
import CreateRoomScreen from './src/screens/CreateRoomScreen';
import { logged_in_user } from './src/managers/UserManager';

const { width: SCREENWIDTH, height: SCREENHEIGHT } = Dimensions.get('window'); //landscape
const app_states = { 
    LOADING: 'LOADING',
    NEW_USER: 'NEW_USER', 
    MAIN_MENU:'MAIN_MENU', 
    FIND_MATCH: 'FIND_MATCH', 
    GAME_PLAY: 'GAME_PLAY', 
    CUSTOM_LOBBY: 'CUSTOM_LOBBY', 
    CREAE_CUSTOM_ROOM: 'CREAE_CUSTOM_ROOM',
    CUSTOM_ROOM: 'CUSTOM_ROOM'
};

const controls_margin_left = 75;
var GetEntities = () => {
    let joystick = {
        type: 'joystick',
        // outerPosition: [SCREENWIDTH / 2, SCREENHEIGHT / 6 * 5],
        outer_position: [controls_margin_left + UI.joystick.outer_radius, SCREENHEIGHT - UI.joystick.bottom_margin - UI.joystick.outer_radius],
        // outer_position: [30, SCREENHEIGHT - 30],
        outer_radius: UI.joystick.outer_radius,
        inner_position: [0, 0],
        inner_radius: UI.joystick.inner_radius,
        touch_id: null,
        active: false,
        angle: null,
        renderer: Joystick,
    };

    let sprint_button = {
        type: 'button',
        id: 'sprint_button',
        position: [SCREENWIDTH - UI.action_buttons.radius - UI.action_buttons.right_margin_far, SCREENHEIGHT - UI.action_buttons.bottom_margin - UI.action_buttons.radius],
        radius: UI.action_buttons.radius,
        touch_id: null,
        active: false,
        renderer: Button,
    };

    let action_button = {
        type: 'button',
        id: 'action_button',
        position: [SCREENWIDTH - UI.action_buttons.right_margin_near - UI.action_buttons.radius, SCREENHEIGHT - UI.action_buttons.bottom_margin - UI.action_buttons.radius*3 - UI.action_buttons.button_spacing],
        radius: UI.action_buttons.radius,
        touch_id: null,
        active: false,
        renderer: Button,
    };

    let camera = {
        position: [0, 0],
        target: null,
    };

    let map = {
        position: [0, 0],
        render_position: [0, 0],
        renderer: Map,
    };

    let game = {
        state: 'GAME_BEGIN'//WAITING, GAME_BEGIN , IN_PROGRESS, GAME_END
    }

    let minimap = {
        bases: [],
        players: [],
        flags: [],
        offset: [UI.joystick.left_margin,(SCREENHEIGHT*UI.minimap.screen_scale - UI.joystick.outer_radius*2 - UI.joystick.bottom_margin)/2], //User can drag minimap to change position. Initial value align left with joystick and space evenly top and below
        touch_id: null,
        touch_offset: [0,0],
        scale: 0, //size of minimap to size of actual game
        height: 0,
        width: 0,
        renderer: Minimap,
    }

    let performance = {
        renderer: Performance
    }

    let scoreboard = {
        score: [0,0],
        remainding_time: 0,
        time_color: 'white',
        renderer: Scoreboard
    }

    let announcements = {
        messages: [],
        renderer: Announcements,
    }

    let entities = {
        map,
        sprint_button,
        action_button,
        joystick,
        camera,
        game,
        performance,
        scoreboard,
        minimap,
        announcements,
    };

    return entities;
};

let entities = GetEntities();


export default class App extends PureComponent {
    
    state = {
        app_state: app_states.LOADING,
        current_players: 0,
        max_players: 0,
        game_modes: ["CUSTOM", "NORMAL"],
        current_game_mode_index: 0
    }

    componentDidMount() {
        console.disableYellowBox = true;
    }

    componentWillMount() {
        this.user_verified_event_listener = EventRegister.on('USER_VERIFICATION_RESULT', (success) => this.setState({app_state: success ? app_states.MAIN_MENU : app_states.NEW_USER})); 
        this.logged_in_event_listener = EventRegister.on('USER_LOGGED_IN', () => this.setState({app_state: app_states.MAIN_MENU})); 
        this.find_match_event_listener = EventRegister.on('FIND_MATCH_UPDATE', ({current_players, max_players}) => this.setState({current_players, max_players})); //update waiting screen
        this.join_room_event_listener = EventRegister.on('JOIN_ROOM_CONFIRMED', ()=>this.setState({app_state: app_states.GAME_PLAY})); //start game when join room triggered
        this.custom_room_event_listener = EventRegister.on('JOIN_CUSTOM_ROOM_CONFIRMED', ()=>this.setState({app_state: app_states.CUSTOM_ROOM})); 
        this.join_room_failed_event_listener = EventRegister.on('JOIN_ROOM_FAILED', (error)=>this.displayError(error)); 
        this.disconnect_game_room_event_listener = EventRegister.on('DISCONNECTED_GAME_ROOM', ()=>this.setState({app_state: app_states.MAIN_MENU}));
        this.disconnect_custom_room_event_listener = EventRegister.on('DISCONNECTED_CUSTOM_ROOM', ()=>this.setState({app_state: app_states.CUSTOM_LOBBY}));
        this.create_custom_room_event_listener = EventRegister.on('CREATE_CUSTOM_ROOM', ()=>this.setState({app_state: app_states.CREAE_CUSTOM_ROOM}));
    }
 
    componentWillUnmount() {
        EventRegister.removeEventListener(this.user_verified_event_listener);
        EventRegister.removeEventListener(this.logged_in_event_listener);
        EventRegister.removeEventListener(this.find_match_event_listener);
        EventRegister.removeEventListener(this.join_room_event_listener);
        EventRegister.removeEventListener(this.custom_room_event_listener);
        EventRegister.removeEventListener(this.join_room_failed_event_listener);
        EventRegister.removeEventListener(this.disconnect_game_room_event_listener);
        EventRegister.removeEventListener(this.disconnect_custom_room_event_listener);
        EventRegister.removeEventListener(this.create_custom_room_event_listener);
    }

    displayError(error) {
        Alert.alert(error.statusText, error.message);
    }
    
    renderGame() {
        return <GameEngine
            style={styles.container}
            systems={[
                FlagSystem,
                JoystickSystem,
                ButtonsSystem,
                ControlsSystem,
                PlayerSystem,
                CameraSystem,
                GameStateSystem,
                PerformanceSystem,
                ScoreboardSystem,
                MinimapSystem,
                // AnnouncementSystem,
            ]}
            entities={entities}>
            <StatusBar hidden={true} />
        </GameEngine>;
    }

    offsetGameMode(offset) {
        let new_index = this.state.current_game_mode_index+offset;
        if(new_index == -1) {
            new_index = this.state.game_modes.length-1;
        }

        this.setState({current_game_mode_index: new_index % this.state.game_modes.length});
    }

    getSelectedGameMode() {
        return this.state.game_modes[this.state.current_game_mode_index];
    }

    findMatch() {
        switch (this.getSelectedGameMode()) {            
            case "CUSTOM":
                InitializeSocketIO(game_domain); 
                RequestLoadLobbyRooms();
                this.setState({app_state: app_states.CUSTOM_LOBBY});
                break;

            case "NORMAL":
                InitializeSocketIO(game_domain);                
                RequestFindMatch(MatchmakingTypes.NORMAL);
                this.setState({app_state: app_states.FIND_MATCH});
                    
            default:
                break;
        }        
    }
    
    renderMainMenu() {
        return <View style={{flex: 1}}> 
                <Image source={Images.menu_background} resizeMode='cover' style={{position: 'absolute', width: '100%', height: '100%'}}/>
            <SafeAreaView style={{flex: 1}}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{marginTop: 22, width: 300, height: 80}}>
                        <Text style={{fontFamily: 'Endless Boss Battle', fontSize: 44, textAlign: 'center', color: 'black', position: 'absolute', left: 6, top: 6, width: 300}}>
                            CAPTURE THE{'\n'}FLAG
                        </Text>
                        <Text style={{fontFamily: 'Endless Boss Battle', fontSize: 44, textAlign: 'center', color: 'white', position: 'absolute', width: 300}}>
                            CAPTURE THE{'\n'}FLAG
                        </Text>
                    </View>
                    <View style={{position: 'absolute', top: 25, right: 12, width: '100%', alignItems: 'flex-end'}}>
                        <Text style={{fontFamily: 'Endless Boss Battle', fontSize: 22, textAlign: 'center', color: 'white', width: 120}}>
                            {logged_in_user.username}
                        </Text>
                        <View style={{flexDirection: 'row', alignItems: 'center',}}>
                            <Text style={{fontFamily: 'Endless Boss Battle', fontSize: 14, textAlign: 'center', color: 'white', marginRight: 12}}>
                                Win:  {logged_in_user.wins} 
                            </Text>
                            <Text style={{fontFamily: 'Endless Boss Battle', fontSize: 14, textAlign: 'center', color: 'white'}}>
                                Lose:  {logged_in_user.losses}
                            </Text>
                            <Image source={Images.flag_red} resizeMode='contain' style={{width: 25, height: 25, marginRight: 2}}/>
                            <Text style={{fontFamily: 'Endless Boss Battle', fontSize: 14, textAlign: 'center', color: 'white'}}>
                                {logged_in_user.flags}
                            </Text>
                        </View>
                    </View>
                    <Image source={Images.flag} style={{width: 400, flex: 1, marginBottom: 12, marginLeft: 8}} resizeMode='contain'/>            
                    <View style={{height: 40, flexDirection: 'row', alignItems: 'center', marginLeft: 40, marginRight: 40, marginBottom: 25 }}>
                        <TouchableOpacity style={{height: 40}} onPress={()=>this.offsetGameMode(-1)}>
                            <Image source={Images.arrow_right} resizeMode='contain'  style={{flex: 1, transform:[{rotateY: '180deg'}]}}/>                        
                        </TouchableOpacity>
                        <Text style={{fontFamily: 'Endless Boss Battle', fontSize: 26, textAlign: 'center', color: 'white', width: 120}}>
                            {this.state.game_modes[this.state.current_game_mode_index]}
                        </Text>
                        <TouchableOpacity style={{height: 40}} onPress={()=>this.offsetGameMode(1)}>
                            <Image source={Images.arrow_right} resizeMode='contain' style={{flex: 1}}/>                        
                        </TouchableOpacity>
                        <View style={{width: 50}}/>
                        <TouchableOpacity style={{ width: 260, height: 40, backgroundColor: '#3cc969', borderRadius: 12, justifyContent: 'center', alignItems: 'center'}}
                            onPress={() => this.findMatch()}>
                            <Text style={{ fontWeight: '500', fontSize: 18, paddingTop: 4, color: 'white', fontFamily: 'Endless Boss Battle' }}>
                                FIND MATCH
                        </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    }

    renderFindMatch() {
        return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>
                Finding Match... {this.state.current_players}/{this.state.max_players}
            </Text>
        </View>
    }

    back() {
        this.setState({app_state: app_states.MAIN_MENU});
    }

    render() {
        // return this.renderGame();
        
        // return <CreateRoomScreen back={()=>this.back()}/>
        switch (this.state.app_state) {
            case app_states.LOADING: 
                return <LoadingScreen/>;

            case app_states.NEW_USER: 
                return <UsernameScreen/>;
                
            case app_states.MAIN_MENU:
                return this.renderMainMenu();

            case app_states.FIND_MATCH:
                return this.renderFindMatch();

            case app_states.GAME_PLAY:
                return this.renderGame();

            case app_states.CUSTOM_LOBBY: 
                return <LobbyScreen back={()=>this.back()}/>
            
            case app_states.CREAE_CUSTOM_ROOM: 
                return <CreateRoomScreen back={()=>this.back()}/>

            case app_states.CUSTOM_ROOM: 
                return <CustomRoomScreen back={()=>this.back()}/>
            default:            
                return this.renderMainMenu();
        }    
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
});

