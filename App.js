/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component, useState } from 'react';
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
    JoinRoom,
    players,
    InitializeSocketIO,
    FindMatch,
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

const { width: SCREENWIDTH, height: SCREENHEIGHT } = Dimensions.get('window'); //landscape
const game_states = {MAIN_MENU:'MAIN_MENU', FIND_MATCH: 'FIND_MATCH', GAME_PLAY: 'GAME_PLAY'};

var GetEntities = () => {
    let joystick = {
        type: 'joystick',
        // outerPosition: [SCREENWIDTH / 2, SCREENHEIGHT / 6 * 5],
        outer_position: [75 + 60, SCREENHEIGHT - 45 - 60],
        // outer_position: [30, SCREENHEIGHT - 30],
        outer_radius: 60,
        inner_position: [0, 0],
        inner_radius: 30,
        touch_id: null,
        active: false,
        angle: null,
        renderer: Joystick,
    };

    let sprint_button = {
        type: 'button',
        id: 'sprint_button',
        position: [SCREENWIDTH - 45 - 36, SCREENHEIGHT - 45 - 36],
        radius: 36,
        touch_id: null,
        active: false,
        renderer: Button,
    };

    let action_button = {
        type: 'button',
        id: 'action_button',
        position: [SCREENWIDTH - 45 - 36, SCREENHEIGHT - 45 - 36 - 36 * 2 - 20],
        radius: 36,
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
        renderer: Minimap,
    }

    let performance = {
        renderer: Performance
    }

    let entities = {
        map,
        sprint_button,
        action_button,
        joystick,
        camera,
        game,
        minimap,
        game,
        performance
    };

    return entities;
};

let entities = GetEntities();


export default class App extends Component {
    
    state = {
        ip_address: 'http://localhost:3000',
        game_state: game_states.MAIN_MENU,
        current_players: 0,
        max_players: 0
    }

    componentDidMount() {
        console.disableYellowBox = true;
    }

    componentWillMount() {
        this.find_match_event_listener = EventRegister.on('FIND_MATCH_UPDATE', ({current_players, max_players}) => this.setState({current_players, max_players})); //update waiting screen
        this.join_room_event_listener = EventRegister.on('JOIN_ROOM_CONFIRMED', ()=>this.setState({game_state: game_states.GAME_PLAY})); //start game when join room triggered
    }
    componentWillUnmount() {
        EventRegister.removeEventListener(this.find_match_event_listener);
        EventRegister.removeEventListener(this.join_room_event_listener);
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
                PerformanceSystem
            ]}
            entities={entities}>
            <StatusBar hidden={true} />
        </GameEngine>;
    }
    
    renderMainMenu() {
        return <View style={{ flex: 1, backgroundColor: 'gray', justifyContent: 'center', alignItems: 'center' }}>
            <Image source={Images.menu_background} resizeMode='cover' style={{position: 'absolute', width: '100%', height: '100%'}}/>
            <Image source={Images.flag} style={{width: 400, height: '50%'}} resizeMode='contain'/>
            <TextInput style={{ width: 300, height: 40, backgroundColor: 'white', borderRadius: 12, marginBottom: 12, paddingLeft: 16 }} onChangeText={(text) => {
                this.setState({ip_address: text});                
            }}>
                {this.state.ip_address}
            </TextInput>
            <TouchableOpacity style={{ width: 300, height: 40, backgroundColor: '#3cc969', borderRadius: 12, justifyContent: 'center', alignItems: 'center' }}
                onPress={() => {
                    InitializeSocketIO(this.state.ip_address);
                    FindMatch();
                    this.setState({game_state: game_states.FIND_MATCH});
                }}>
                <Text style={{ fontWeight: '500', fontSize: 16, color: 'white' }}>
                    FIND MATCH
            </Text>
            </TouchableOpacity>
        </View>
    }

    renderFindMatch() {
        return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>
                Finding Match... {this.state.current_players}/{this.state.max_players}
            </Text>
        </View>
    }

    render() {
        // const [ip_address, setIPAddress] = useState('http://mooselliot.com:3000');        

        switch (this.state.game_state) {
            case game_states.MAIN_MENU:
                return this.renderMainMenu();

            case game_states.FIND_MATCH:
                return this.renderFindMatch();
                // return RenderFindingMatch(setGameState);

            case game_states.GAME_PLAY:
                return this.renderGame();

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

