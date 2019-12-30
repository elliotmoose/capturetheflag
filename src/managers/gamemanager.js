
import io from 'socket.io-client';
import Player from '../renderers/Player';

export var players = []; 
const server = 'http://localhost:3000';
var socket = io(server);

export var InitializeSocketIO = ()=>{
    socket.on('connect', ()=>console.log('connected to lobby'));        
    socket.on('JOIN_ROOM_CONFIRMED', (namespace)=> JoinRoom(namespace));
}

export var FindMatch = () => {
    socket.emit("REQUEST_FIND_MATCH");
}

export var JoinRoom = (namespace)=>{
    socket = io(`${server}/${namespace}`);
    socket.on('GAME_STATE', (state)=>OnReceiveGameState(state));
}

export var OnReceiveGameState = (state)=>{    
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
}

export var SendControls = (controls)=>{    
    socket.emit('CONTROLS', controls)
}