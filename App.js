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

const { width: SCREENWIDTH, height: SCREENHEIGHT } = Dimensions.get('window'); //landscape


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

    let entities = {
        map,
        sprint_button,
        action_button,
        joystick,
        camera,
        game
    };

    // for(let i=0;i<1;i++)
    // {
    //     let player = players[i] || {
    //         type: 'player',
    //         position: [SCREENWIDTH/2, SCREENHEIGHT/2],
    //         max_stamina: 100,
    //         current_stamina: 100,
    //         sprint_speed: 10,
    //         default_speed: 4,
    //         current_speed: 4,
    //         renderer: Player
    //     };

    //     entities[`${i+2}`] = player;
    // }

    return entities;
};

let entities = GetEntities();

const RenderGame = () => {
    return <GameEngine
        style={styles.container}
        systems={[
            FlagSystem,
            JoystickSystem,
            ButtonsSystem,
            ControlsSystem,
            PlayerSystem,
            CameraSystem,
            GameStateSystem
        ]}
        entities={entities}>
        <StatusBar hidden={true} />
    </GameEngine>;
}

const RenderMenu = (setGameInProgress, ip_address, setIPAddress) => {    
    return <View style={{flex: 1, backgroundColor: 'gray', justifyContent: 'center', alignItems: 'center'}}>
        <TextInput style={{width: 300, height: 40, backgroundColor: 'white', borderRadius: 12, marginBottom: 12, paddingLeft: 16}} onChangeText={(text)=>{
            setIPAddress(text);
        }}>
            {ip_address}
        </TextInput>
        <TouchableOpacity style={{width: 300, height: 40, backgroundColor: '#3cc969', borderRadius: 12, justifyContent: 'center', alignItems: 'center'}} 
        onPress={()=>{
            InitializeSocketIO(ip_address);
            FindMatch();
            setGameInProgress(true);
        }}>
            <Text style={{fontWeight: '500', fontSize: 16, color:'white'}}>
                FIND MATCH
            </Text>
        </TouchableOpacity>
    </View>
}

let sprite = null;
const App = () => {
    console.disableYellowBox = true;
    
    // const [ip_address, setIPAddress] = useState('http://mooselliot.com:3000');
    const [ip_address, setIPAddress] = useState('http://localhost:3000');
    const [game_in_progress, setGameInProgress] = useState(false);

    if(game_in_progress) {
        return RenderGame();
    }
    else {
        return RenderMenu(setGameInProgress, ip_address, setIPAddress);
    }     
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
});

export default App;
