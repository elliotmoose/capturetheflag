/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
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
import { ConnectToServer, SendControls, JoinRoom, players, InitializeSocketIO } from './src/managers/gamemanager';
import Player from './src/renderers/Player';
import Button from './src/renderers/controls/Button';
import { JoystickSystem } from './src/systems/JoystickSystem';
import { ButtonsSystem } from './src/systems/ButtonsSystem';
import { ControlsSystem } from './src/systems/ControlsSystem';


const { width: SCREENWIDTH, height: SCREENHEIGHT } = Dimensions.get("window");

InitializeSocketIO();


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
        joystick: joystick,
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

let entities = GetEntities();
const App = () => {
    console.disableYellowBox = true;


    // console.log(`players ${players}`);
    // console.log(entities);

    const button_height = 70;

    return (
        <GameEngine
            style={styles.container}
            systems={[JoystickSystem, ButtonsSystem, ControlsSystem, PlayerSystem]}
            entities={entities}>
            
            <StatusBar hidden={true} />
            {/* <TouchableOpacity style={{
                position: 'absolute',
                right: 45,
                bottom: 45,
                height: button_height,
                width: button_height,
                borderRadius: button_height/2,
                backgroundColor: 'lightgreen',
                justifyContent: 'center',
                alignItems: 'center',
            }} onPressIn={()=>{
                entities[2].speed = 10;
            }} onPressOut={()=>{
                entities[2].speed = 4;
            }}>
                <Text>
                    Sprint
                </Text>
            </TouchableOpacity> */}



            {/* <TouchableOpacity onPress={() => SendControls()} style={{
                position: 'absolute',
                bottom: 10,
                left: 45,
                right: 45,                
                height: 40,
                backgroundColor: 'green',
                justifyContent: 'center',
                alignContent: 'center',
            }}>
                <Text>
                    Send Controls
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => JoinRoom(`elliot'sroom`)} style={{
                position: 'absolute',
                bottom: 60,
                left: 45,
                right: 45,                
                height: 40,
                backgroundColor: 'red',
                justifyContent: 'center',
                alignContent: 'center',
            }}>
                <Text>
                    Join Room
                </Text>
            </TouchableOpacity> */}
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
