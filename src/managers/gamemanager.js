
import io from 'socket.io-client';
import Player from '../renderers/Player';

export var players = []; 
const server = 'http://localhost:3000';
var socket = io(server);
var room_id = "elliot'sroom";

export var InitializeSocketIO = ()=>{
    socket.on('connect', function(test){
        console.log('connected to lobby')
        // JoinRoom("elliot'sroom");
    });        

    socket.on('JOIN_ROOM_CONFIRMED', (namespace)=> {
        console.log(`Match found for namespace: ${namespace}`);
        socket = io(`${server}/${namespace}`);

        socket.on('GAME_STATE', function(state){
            console.log(state);
        
            let new_players = []
            for(let player of state.players)
            {
                new_players.push({
                    type: 'player',
                    position: player.position,
                    renderer: Player
                })
            }
        
            players = new_players;        
            // players = state.players
            // JoinRoom("elliot'sroom");
        });
    });
}

export var FindMatch = () => {
    socket.emit("REQUEST_FIND_MATCH");
}

export var JoinRoom = (room_id)=>{
    socket.emit('REQUEST_JOIN_ROOM', room_id);
}

export var ConnectToServer = ()=>{

}

export var SendControls = ()=>{
    socket.emit('controls', room_id)
}