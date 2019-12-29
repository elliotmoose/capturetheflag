/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
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
    Dimensions
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
import { ConnectToServer, SendControls, JoinRoom, players, InitializeSocketIO, FindMatch } from './src/managers/gamemanager';
import Player from './src/renderers/Player';
import Button from './src/renderers/controls/Button';
import { JoystickSystem } from './src/systems/JoystickSystem';
import { ButtonsSystem } from './src/systems/ButtonsSystem';
import { ControlsSystem } from './src/systems/ControlsSystem';


const { width: SCREENWIDTH, height: SCREENHEIGHT } = Dimensions.get("window");

InitializeSocketIO();
FindMatch();

var GetEntities = ()=>{
    
    console.log('getting entities');
    let joystick = {
        type: 'joystick',
        // outerPosition: [SCREENWIDTH / 2, SCREENHEIGHT / 6 * 5],
        outer_position: [45 + 60, SCREENHEIGHT - 45 - 60],
        outer_radius: 60,
        inner_position: [0, 0],
        inner_radius: 30,
        touch_id: null,
        active : false,
        angle: null,
        renderer: Joystick
    }

    let sprint_button = {
        type: "button",
        id: "sprint_button",
        position: [SCREENWIDTH - 45 - 36, SCREENHEIGHT - 45 - 36],
        radius: 36,
        touch_id: null,
        active: false,
        renderer: Button
    }

    let entities = {
        joystick,
        sprint_button
    }

    for(let i=0;i<1;i++)
    {
        let player = players[i] || {
            type: 'player', 
            position: [SCREENWIDTH/2, SCREENHEIGHT/2],
            max_stamina: 100,
            current_stamina: 100,            
            sprint_speed: 10,
            default_speed: 4,
            current_speed: 4, 
            renderer: Player
        };

        entities[`${i+2}`] = player;
    }

    
    return entities;
}

const App = () => {
    console.disableYellowBox = true;


    // console.log(`players ${players}`);
    // console.log(entities);

    const button_height = 70;

    return (
        <GameEngine
            style={styles.container}
            systems={[JoystickSystem, ButtonsSystem, ControlsSystem, PlayerSystem]}
            entities={GetEntities()}>
            
            <StatusBar hidden={true} />
        </GameEngine>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    }
});

export default App;



