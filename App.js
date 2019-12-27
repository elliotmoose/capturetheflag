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

import { JoystickSystem, PlayerUpdater } from './src/systems/systems';
import Joystick from './src/renderers/Joystick';
import { ConnectToServer, SendControls, JoinRoom, players, InitializeSocketIO } from './src/managers/gamemanager';
import Player from './src/renderers/Player';


const { width: SCREENWIDTH, height: SCREENHEIGHT } = Dimensions.get("window");

InitializeSocketIO();


var GetEntities = ()=>{
    
    console.log('getting entities');
    let joystick = {
        type: 'joystick',
        outerPosition: [SCREENWIDTH / 2, SCREENHEIGHT / 4 * 3],
        outerRadius: 60,
        innerPosition: [0, 0],
        innerRadius: 30,
        touch_id: null,
        renderer: Joystick
    }

    let entities = {
        joystick: joystick,
        // player: {
        //     type: 'player',
        //     position : [50,50],
        //     renderer: Player
        // }
    }

    for(let i=0;i<10;i++)
    {
        let player = players[i] || {type: 'player', position: [0,0], renderer: Player};
        entities[`${i+2}`] = player;
    }

    
    return entities;
}
const App = () => {
    console.disableYellowBox = true;


    // console.log(`players ${players}`);
    // console.log(entities);


    return (
        <GameEngine
            style={styles.container}
            systems={[JoystickSystem, PlayerUpdater]}
            entities={GetEntities()}>

            <StatusBar hidden={true} />

            <TouchableOpacity onPress={() => SendControls()} style={{
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
            </TouchableOpacity>
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
